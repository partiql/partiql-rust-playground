#!/usr/bin/env python3
"""Writes the NOTICE shipped with the wasm build: this project's NOTICE followed by the NOTICE file of
every crate compiled into the .wasm that ships one (Apache-2.0 section 4d).

Usage: scripts/gen_notice.py > pkg-web/NOTICE   (run from the repository root)
"""
import json
import subprocess
from collections import defaultdict
from pathlib import Path

TARGET = "wasm32-unknown-unknown"
RULE = "-" * 80


def main():
    meta = json.loads(subprocess.check_output(
        ["cargo", "metadata", "--format-version", "1", "--locked", "--filter-platform", TARGET]))
    packages = {p["id"]: p for p in meta["packages"]}
    nodes = {n["id"]: n for n in meta["resolve"]["nodes"]}

    # Crates linked into the cdylib: walk normal (non-dev, non-build) dependencies from the root.
    root = meta["resolve"]["root"]
    seen, stack = set(), [root]
    while stack:
        pid = stack.pop()
        if pid in seen:
            continue
        seen.add(pid)
        for dep in nodes[pid]["deps"]:
            if any(k["kind"] is None for k in dep["dep_kinds"]):
                stack.append(dep["pkg"])

    # Group identical NOTICE texts (e.g. two versions of one crate).
    notices = defaultdict(list)
    for pid in seen - {root}:
        pkg = packages[pid]
        crate_dir = Path(pkg["manifest_path"]).parent
        for name in ("NOTICE", "NOTICE.txt", "NOTICE.md"):
            path = crate_dir / name
            if path.is_file():
                notices[path.read_text().strip()].append(pkg)
                break

    print(Path("NOTICE").read_text().strip())
    if notices:
        print()
        print("This product includes the following Apache-2.0 licensed software, whose NOTICE files follow.")
        for text, pkgs in sorted(notices.items(), key=lambda kv: min(p["name"] for p in kv[1])):
            pkgs.sort(key=lambda p: (p["name"], p["version"]))
            names = sorted({p["name"] for p in pkgs})
            label = ", ".join(f"{n} {' and '.join(p['version'] for p in pkgs if p['name'] == n)}" for n in names)
            repo = pkgs[0].get("repository")
            print()
            print(RULE)
            print(f"{label} ({repo})" if repo else label)
            print()
            print(text)
    print()
    print(RULE)
    print("Licenses for all Rust crates compiled into partiql_playground_bg.wasm: THIRD_PARTY_LICENSES.txt")


if __name__ == "__main__":
    main()
