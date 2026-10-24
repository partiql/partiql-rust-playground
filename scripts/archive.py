#!/usr/bin/env python3
"""Writes a deterministic .tar.gz (fixed order, owner, mode and mtime) and its .sha256 file, the same on
every platform (no GNU tar or sha256sum needed).

Usage: scripts/archive.py <archive.tar.gz> <top-level dir name> <mtime> <source dir> <file>...
"""
import gzip
import hashlib
import io
import sys
import tarfile
from pathlib import Path


def main(archive, top, mtime, src, *files):
    mtime = int(mtime)
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w", format=tarfile.PAX_FORMAT) as tar:
        entries = [(top, None)] + [(f"{top}/{f}", Path(src, f)) for f in sorted(files)]
        for name, path in entries:
            info = tarfile.TarInfo(name)
            info.mtime = mtime
            info.uid = info.gid = 0
            info.uname = info.gname = ""
            if path is None:
                info.type = tarfile.DIRTYPE
                info.mode = 0o755
                tar.addfile(info)
            else:
                data = path.read_bytes()
                info.size = len(data)
                info.mode = 0o644
                tar.addfile(info, io.BytesIO(data))
    data = gzip.compress(buf.getvalue(), compresslevel=9, mtime=0)

    out = Path(archive)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(data)
    digest = hashlib.sha256(data).hexdigest()
    Path(f"{archive}.sha256").write_text(f"{digest}  {out.name}\n", encoding="utf-8")


if __name__ == "__main__":
    main(*sys.argv[1:])
