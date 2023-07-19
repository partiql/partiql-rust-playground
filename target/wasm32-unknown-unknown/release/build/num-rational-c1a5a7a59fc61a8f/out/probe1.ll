; ModuleID = 'probe1.103148df-cgu.0'
source_filename = "probe1.103148df-cgu.0"
target datalayout = "e-m:e-p:32:32-p10:8:8-p20:8:8-i64:64-n32:64-S128-ni:1:10:20"
target triple = "wasm32-unknown-unknown"

%"core::fmt::Arguments" = type { { ptr, i32 }, { ptr, i32 }, { ptr, i32 } }
%"alloc::string::String" = type { %"alloc::vec::Vec<u8>" }
%"alloc::vec::Vec<u8>" = type { { ptr, i32 }, i32 }
%"core::ptr::metadata::PtrComponents<u8>" = type { ptr, {} }
%"core::ptr::metadata::PtrRepr<u8>" = type { [1 x i32] }
%"core::ptr::metadata::PtrRepr<[u8]>" = type { [2 x i32] }
%"alloc::alloc::Global" = type {}
%"core::option::Option<(core::ptr::non_null::NonNull<u8>, core::alloc::layout::Layout)>" = type { [2 x i32], i32 }

@alloc3 = private unnamed_addr constant <{}> zeroinitializer, align 4
@alloc9 = private unnamed_addr constant <{ [12 x i8] }> <{ [12 x i8] c"invalid args" }>, align 1
@alloc10 = private unnamed_addr constant <{ ptr, [4 x i8] }> <{ ptr @alloc9, [4 x i8] c"\0C\00\00\00" }>, align 4
@alloc51 = private unnamed_addr constant <{ [75 x i8] }> <{ [75 x i8] c"/rustc/897e37553bba8b42751c67658967889d11ecd120/library/core/src/fmt/mod.rs" }>, align 1
@alloc52 = private unnamed_addr constant <{ ptr, [12 x i8] }> <{ ptr @alloc51, [12 x i8] c"K\00\00\00\8C\01\00\00\0D\00\00\00" }>, align 4
@alloc53 = private unnamed_addr constant <{ [80 x i8] }> <{ [80 x i8] c"/rustc/897e37553bba8b42751c67658967889d11ecd120/library/core/src/alloc/layout.rs" }>, align 1
@alloc54 = private unnamed_addr constant <{ ptr, [12 x i8] }> <{ ptr @alloc53, [12 x i8] c"P\00\00\00\B4\01\00\00)\00\00\00" }>, align 4
@str.0 = internal constant [25 x i8] c"attempt to divide by zero"
@alloc4 = private unnamed_addr constant <{ ptr, [4 x i8] }> <{ ptr @alloc3, [4 x i8] zeroinitializer }>, align 4
@alloc6 = private unnamed_addr constant <{ [4 x i8] }> zeroinitializer, align 4

; <core::ptr::non_null::NonNull<T> as core::convert::From<core::ptr::unique::Unique<T>>>::from
; Function Attrs: inlinehint nounwind
define hidden ptr @"_ZN119_$LT$core..ptr..non_null..NonNull$LT$T$GT$$u20$as$u20$core..convert..From$LT$core..ptr..unique..Unique$LT$T$GT$$GT$$GT$4from17hd5520cc8ec005984E"(ptr %unique) unnamed_addr #0 {
start:
  %0 = alloca ptr, align 4
  store ptr %unique, ptr %0, align 4
  %1 = load ptr, ptr %0, align 4, !nonnull !0, !noundef !0
  ret ptr %1
}

; <alloc::collections::TryReserveError as core::convert::From<alloc::collections::TryReserveErrorKind>>::from
; Function Attrs: inlinehint nounwind
define internal { i32, i32 } @"_ZN122_$LT$alloc..collections..TryReserveError$u20$as$u20$core..convert..From$LT$alloc..collections..TryReserveErrorKind$GT$$GT$4from17hb9e77d193c9d53d3E"(i32 %kind.0, i32 %kind.1) unnamed_addr #0 {
start:
  %0 = alloca { i32, i32 }, align 4
  %1 = getelementptr inbounds { i32, i32 }, ptr %0, i32 0, i32 0
  store i32 %kind.0, ptr %1, align 4
  %2 = getelementptr inbounds { i32, i32 }, ptr %0, i32 0, i32 1
  store i32 %kind.1, ptr %2, align 4
  %3 = getelementptr inbounds { i32, i32 }, ptr %0, i32 0, i32 0
  %4 = load i32, ptr %3, align 4
  %5 = getelementptr inbounds { i32, i32 }, ptr %0, i32 0, i32 1
  %6 = load i32, ptr %5, align 4, !range !1, !noundef !0
  %7 = insertvalue { i32, i32 } undef, i32 %4, 0
  %8 = insertvalue { i32, i32 } %7, i32 %6, 1
  ret { i32, i32 } %8
}

; core::fmt::ArgumentV1::new_lower_exp
; Function Attrs: inlinehint nounwind
define hidden { ptr, ptr } @_ZN4core3fmt10ArgumentV113new_lower_exp17h1d2faba81e2c386cE(ptr align 4 %x) unnamed_addr #0 {
start:
  %0 = alloca ptr, align 4
  %1 = alloca ptr, align 4
  %2 = alloca { ptr, ptr }, align 4
  store ptr @"_ZN4core3fmt3num3imp55_$LT$impl$u20$core..fmt..LowerExp$u20$for$u20$isize$GT$3fmt17hbb4522c979bc4086E", ptr %1, align 4
  %_4 = load ptr, ptr %1, align 4, !nonnull !0, !noundef !0
  br label %bb1

bb1:                                              ; preds = %start
  store ptr %x, ptr %0, align 4
  %_6 = load ptr, ptr %0, align 4, !nonnull !0, !align !2, !noundef !0
  br label %bb2

bb2:                                              ; preds = %bb1
  store ptr %_6, ptr %2, align 4
  %3 = getelementptr inbounds { ptr, ptr }, ptr %2, i32 0, i32 1
  store ptr %_4, ptr %3, align 4
  %4 = getelementptr inbounds { ptr, ptr }, ptr %2, i32 0, i32 0
  %5 = load ptr, ptr %4, align 4, !nonnull !0, !align !2, !noundef !0
  %6 = getelementptr inbounds { ptr, ptr }, ptr %2, i32 0, i32 1
  %7 = load ptr, ptr %6, align 4, !nonnull !0, !noundef !0
  %8 = insertvalue { ptr, ptr } undef, ptr %5, 0
  %9 = insertvalue { ptr, ptr } %8, ptr %7, 1
  ret { ptr, ptr } %9
}

; core::fmt::Arguments::as_str
; Function Attrs: inlinehint nounwind
define internal { ptr, i32 } @_ZN4core3fmt9Arguments6as_str17h37ded6762b8dd2c5E(ptr align 4 %self) unnamed_addr #0 {
start:
  %_2 = alloca { { ptr, i32 }, { ptr, i32 } }, align 4
  %0 = alloca { ptr, i32 }, align 4
  %1 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 0
  %_3.0 = load ptr, ptr %1, align 4, !nonnull !0, !align !3, !noundef !0
  %2 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 1
  %_3.1 = load i32, ptr %2, align 4
  %3 = getelementptr inbounds %"core::fmt::Arguments", ptr %self, i32 0, i32 2
  %4 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 0
  %_4.0 = load ptr, ptr %4, align 4, !nonnull !0, !align !3, !noundef !0
  %5 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 1
  %_4.1 = load i32, ptr %5, align 4
  %6 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 0
  store ptr %_3.0, ptr %6, align 4
  %7 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 1
  store i32 %_3.1, ptr %7, align 4
  %8 = getelementptr inbounds { { ptr, i32 }, { ptr, i32 } }, ptr %_2, i32 0, i32 1
  %9 = getelementptr inbounds { ptr, i32 }, ptr %8, i32 0, i32 0
  store ptr %_4.0, ptr %9, align 4
  %10 = getelementptr inbounds { ptr, i32 }, ptr %8, i32 0, i32 1
  store i32 %_4.1, ptr %10, align 4
  %11 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 0
  %_21.0 = load ptr, ptr %11, align 4, !nonnull !0, !align !3, !noundef !0
  %12 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 1
  %_21.1 = load i32, ptr %12, align 4
  %_16 = icmp eq i32 %_21.1, 0
  br i1 %_16, label %bb1, label %bb3

bb3:                                              ; preds = %start
  %13 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 0
  %_23.0 = load ptr, ptr %13, align 4, !nonnull !0, !align !3, !noundef !0
  %14 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 1
  %_23.1 = load i32, ptr %14, align 4
  %_13 = icmp eq i32 %_23.1, 1
  br i1 %_13, label %bb4, label %bb2

bb1:                                              ; preds = %start
  %15 = getelementptr inbounds { { ptr, i32 }, { ptr, i32 } }, ptr %_2, i32 0, i32 1
  %16 = getelementptr inbounds { ptr, i32 }, ptr %15, i32 0, i32 0
  %_22.0 = load ptr, ptr %16, align 4, !nonnull !0, !align !3, !noundef !0
  %17 = getelementptr inbounds { ptr, i32 }, ptr %15, i32 0, i32 1
  %_22.1 = load i32, ptr %17, align 4
  %_7 = icmp eq i32 %_22.1, 0
  br i1 %_7, label %bb5, label %bb2

bb2:                                              ; preds = %bb4, %bb3, %bb1
  store ptr null, ptr %0, align 4
  br label %bb7

bb5:                                              ; preds = %bb1
  %18 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 0
  store ptr @alloc3, ptr %18, align 4
  %19 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 1
  store i32 0, ptr %19, align 4
  br label %bb7

bb7:                                              ; preds = %bb2, %bb6, %bb5
  %20 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 0
  %21 = load ptr, ptr %20, align 4, !align !2
  %22 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 1
  %23 = load i32, ptr %22, align 4
  %24 = insertvalue { ptr, i32 } undef, ptr %21, 0
  %25 = insertvalue { ptr, i32 } %24, i32 %23, 1
  ret { ptr, i32 } %25

bb4:                                              ; preds = %bb3
  %26 = getelementptr inbounds { { ptr, i32 }, { ptr, i32 } }, ptr %_2, i32 0, i32 1
  %27 = getelementptr inbounds { ptr, i32 }, ptr %26, i32 0, i32 0
  %_24.0 = load ptr, ptr %27, align 4, !nonnull !0, !align !3, !noundef !0
  %28 = getelementptr inbounds { ptr, i32 }, ptr %26, i32 0, i32 1
  %_24.1 = load i32, ptr %28, align 4
  %_10 = icmp eq i32 %_24.1, 0
  br i1 %_10, label %bb6, label %bb2

bb6:                                              ; preds = %bb4
  %29 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 0
  %_25.0 = load ptr, ptr %29, align 4, !nonnull !0, !align !3, !noundef !0
  %30 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 1
  %_25.1 = load i32, ptr %30, align 4
  %s = getelementptr inbounds [0 x { ptr, i32 }], ptr %_25.0, i32 0, i32 0
  %31 = getelementptr inbounds { ptr, i32 }, ptr %s, i32 0, i32 0
  %_26.0 = load ptr, ptr %31, align 4, !nonnull !0, !align !2, !noundef !0
  %32 = getelementptr inbounds { ptr, i32 }, ptr %s, i32 0, i32 1
  %_26.1 = load i32, ptr %32, align 4
  %33 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 0
  store ptr %_26.0, ptr %33, align 4
  %34 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 1
  store i32 %_26.1, ptr %34, align 4
  br label %bb7
}

; core::fmt::Arguments::new_v1
; Function Attrs: inlinehint nounwind
define internal void @_ZN4core3fmt9Arguments6new_v117h2166c1f8b772fe6cE(ptr sret(%"core::fmt::Arguments") %0, ptr align 4 %pieces.0, i32 %pieces.1, ptr align 4 %args.0, i32 %args.1) unnamed_addr #0 {
start:
  %_24 = alloca { ptr, i32 }, align 4
  %_16 = alloca %"core::fmt::Arguments", align 4
  %_3 = alloca i8, align 1
  %_4 = icmp ult i32 %pieces.1, %args.1
  br i1 %_4, label %bb1, label %bb2

bb2:                                              ; preds = %start
  %_12 = add i32 %args.1, 1
  %_9 = icmp ugt i32 %pieces.1, %_12
  %1 = zext i1 %_9 to i8
  store i8 %1, ptr %_3, align 1
  br label %bb3

bb1:                                              ; preds = %start
  store i8 1, ptr %_3, align 1
  br label %bb3

bb3:                                              ; preds = %bb2, %bb1
  %2 = load i8, ptr %_3, align 1, !range !4, !noundef !0
  %3 = trunc i8 %2 to i1
  br i1 %3, label %bb4, label %bb6

bb6:                                              ; preds = %bb3
  store ptr null, ptr %_24, align 4
  %4 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 0
  store ptr %pieces.0, ptr %4, align 4
  %5 = getelementptr inbounds { ptr, i32 }, ptr %0, i32 0, i32 1
  store i32 %pieces.1, ptr %5, align 4
  %6 = getelementptr inbounds %"core::fmt::Arguments", ptr %0, i32 0, i32 1
  %7 = getelementptr inbounds { ptr, i32 }, ptr %_24, i32 0, i32 0
  %8 = load ptr, ptr %7, align 4, !align !3
  %9 = getelementptr inbounds { ptr, i32 }, ptr %_24, i32 0, i32 1
  %10 = load i32, ptr %9, align 4
  %11 = getelementptr inbounds { ptr, i32 }, ptr %6, i32 0, i32 0
  store ptr %8, ptr %11, align 4
  %12 = getelementptr inbounds { ptr, i32 }, ptr %6, i32 0, i32 1
  store i32 %10, ptr %12, align 4
  %13 = getelementptr inbounds %"core::fmt::Arguments", ptr %0, i32 0, i32 2
  %14 = getelementptr inbounds { ptr, i32 }, ptr %13, i32 0, i32 0
  store ptr %args.0, ptr %14, align 4
  %15 = getelementptr inbounds { ptr, i32 }, ptr %13, i32 0, i32 1
  store i32 %args.1, ptr %15, align 4
  ret void

bb4:                                              ; preds = %bb3
; call core::fmt::Arguments::new_v1
  call void @_ZN4core3fmt9Arguments6new_v117h2166c1f8b772fe6cE(ptr sret(%"core::fmt::Arguments") %_16, ptr align 4 @alloc10, i32 1, ptr align 4 @alloc3, i32 0) #12
  br label %bb5

bb5:                                              ; preds = %bb4
; call core::panicking::panic_fmt
  call void @_ZN4core9panicking9panic_fmt17h751be80779d42b53E(ptr %_16, ptr align 4 @alloc52) #13
  unreachable
}

; core::ops::function::FnOnce::call_once
; Function Attrs: inlinehint nounwind
define internal void @_ZN4core3ops8function6FnOnce9call_once17h2b2563568e3850e1E(ptr sret(%"alloc::string::String") %0, ptr align 1 %1, i32 %2) unnamed_addr #0 {
start:
  %_2 = alloca { ptr, i32 }, align 4
  %3 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 0
  store ptr %1, ptr %3, align 4
  %4 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 1
  store i32 %2, ptr %4, align 4
  %5 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 0
  %6 = load ptr, ptr %5, align 4, !nonnull !0, !align !2, !noundef !0
  %7 = getelementptr inbounds { ptr, i32 }, ptr %_2, i32 0, i32 1
  %8 = load i32, ptr %7, align 4
; call alloc::str::<impl alloc::borrow::ToOwned for str>::to_owned
  call void @"_ZN5alloc3str56_$LT$impl$u20$alloc..borrow..ToOwned$u20$for$u20$str$GT$8to_owned17h71729ba34de04762E"(ptr sret(%"alloc::string::String") %0, ptr align 1 %6, i32 %8) #12
  br label %bb1

bb1:                                              ; preds = %start
  ret void
}

; core::ptr::drop_in_place<alloc::string::String>
; Function Attrs: nounwind
define hidden void @"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h453ab2d80895cd1eE"(ptr %_1) unnamed_addr #1 {
start:
; call core::ptr::drop_in_place<alloc::vec::Vec<u8>>
  call void @"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17h86bda9b807a142f0E"(ptr %_1) #12
  br label %bb1

bb1:                                              ; preds = %start
  ret void
}

; core::ptr::drop_in_place<alloc::vec::Vec<u8>>
; Function Attrs: nounwind
define hidden void @"_ZN4core3ptr46drop_in_place$LT$alloc..vec..Vec$LT$u8$GT$$GT$17h86bda9b807a142f0E"(ptr %_1) unnamed_addr #1 {
start:
; call <alloc::vec::Vec<T,A> as core::ops::drop::Drop>::drop
  call void @"_ZN70_$LT$alloc..vec..Vec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17h14272de0bf59396cE"(ptr align 4 %_1) #12
  br label %bb2

bb2:                                              ; preds = %start
; call core::ptr::drop_in_place<alloc::raw_vec::RawVec<u8>>
  call void @"_ZN4core3ptr53drop_in_place$LT$alloc..raw_vec..RawVec$LT$u8$GT$$GT$17hfcdcd25ea75f047cE"(ptr %_1) #12
  br label %bb1

bb1:                                              ; preds = %bb2
  ret void
}

; core::ptr::drop_in_place<alloc::raw_vec::RawVec<u8>>
; Function Attrs: nounwind
define hidden void @"_ZN4core3ptr53drop_in_place$LT$alloc..raw_vec..RawVec$LT$u8$GT$$GT$17hfcdcd25ea75f047cE"(ptr %_1) unnamed_addr #1 {
start:
; call <alloc::raw_vec::RawVec<T,A> as core::ops::drop::Drop>::drop
  call void @"_ZN77_$LT$alloc..raw_vec..RawVec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17ha9deebd2f898ac31E"(ptr align 4 %_1) #12
  br label %bb1

bb1:                                              ; preds = %start
  ret void
}

; core::ptr::mut_ptr::<impl *mut T>::guaranteed_eq
; Function Attrs: inlinehint nounwind
define hidden i8 @"_ZN4core3ptr7mut_ptr31_$LT$impl$u20$$BP$mut$u20$T$GT$13guaranteed_eq17hc7702b22f1fa7154E"(ptr %self, ptr %other) unnamed_addr #0 {
start:
  %0 = alloca i8, align 1
  %1 = alloca i8, align 1
  %2 = icmp eq ptr %self, %other
  %3 = zext i1 %2 to i8
  store i8 %3, ptr %0, align 1
  %_8 = load i8, ptr %0, align 1
  br label %bb1

bb1:                                              ; preds = %start
  %4 = icmp eq i8 %_8, 2
  br i1 %4, label %bb3, label %bb2

bb3:                                              ; preds = %bb1
  store i8 2, ptr %1, align 1
  br label %bb4

bb2:                                              ; preds = %bb1
  %_14 = icmp eq i8 %_8, 1
  %5 = zext i1 %_14 to i8
  store i8 %5, ptr %1, align 1
  br label %bb4

bb4:                                              ; preds = %bb3, %bb2
  %6 = load i8, ptr %1, align 1, !range !5, !noundef !0
  ret i8 %6
}

; core::ptr::mut_ptr::<impl *mut T>::is_null
; Function Attrs: inlinehint nounwind
define hidden zeroext i1 @"_ZN4core3ptr7mut_ptr31_$LT$impl$u20$$BP$mut$u20$T$GT$7is_null17hfe72b24f4e3f29bfE"(ptr %self) unnamed_addr #0 {
start:
  %0 = alloca ptr, align 4
  %_13 = alloca %"core::ptr::metadata::PtrComponents<u8>", align 4
  %_12 = alloca %"core::ptr::metadata::PtrRepr<u8>", align 4
  %_2 = alloca i8, align 1
  %1 = alloca i8, align 1
  store i32 0, ptr %0, align 4
  %data_address = load ptr, ptr %0, align 4
  br label %bb6

bb6:                                              ; preds = %start
  store ptr %data_address, ptr %_13, align 4
  call void @llvm.memcpy.p0.p0.i32(ptr align 4 %_12, ptr align 4 %_13, i32 4, i1 false)
  %_5 = load ptr, ptr %_12, align 4
; call core::ptr::mut_ptr::<impl *mut T>::guaranteed_eq
  %2 = call i8 @"_ZN4core3ptr7mut_ptr31_$LT$impl$u20$$BP$mut$u20$T$GT$13guaranteed_eq17hc7702b22f1fa7154E"(ptr %self, ptr %_5) #12, !range !5
  store i8 %2, ptr %_2, align 1
  br label %bb1

bb1:                                              ; preds = %bb6
  %3 = load i8, ptr %_2, align 1, !range !5, !noundef !0
  %4 = sub i8 %3, 2
  %5 = icmp eq i8 %4, 0
  %_6 = select i1 %5, i32 0, i32 1
  switch i32 %_6, label %bb3 [
    i32 0, label %bb4
    i32 1, label %bb2
  ]

bb3:                                              ; preds = %bb1
  unreachable

bb4:                                              ; preds = %bb1
  store i8 0, ptr %1, align 1
  br label %bb5

bb2:                                              ; preds = %bb1
  %6 = load i8, ptr %_2, align 1, !range !4, !noundef !0
  %res = trunc i8 %6 to i1
  %7 = zext i1 %res to i8
  store i8 %7, ptr %1, align 1
  br label %bb5

bb5:                                              ; preds = %bb4, %bb2
  %8 = load i8, ptr %1, align 1, !range !4, !noundef !0
  %9 = trunc i8 %8 to i1
  ret i1 %9
}

; core::ptr::non_null::NonNull<T>::new
; Function Attrs: inlinehint nounwind
define hidden ptr @"_ZN4core3ptr8non_null16NonNull$LT$T$GT$3new17hb1b6128fd5ee6c60E"(ptr %ptr) unnamed_addr #0 {
start:
  %_5 = alloca ptr, align 4
  %0 = alloca ptr, align 4
; call core::ptr::mut_ptr::<impl *mut T>::is_null
  %_3 = call zeroext i1 @"_ZN4core3ptr7mut_ptr31_$LT$impl$u20$$BP$mut$u20$T$GT$7is_null17hfe72b24f4e3f29bfE"(ptr %ptr) #12
  br label %bb1

bb1:                                              ; preds = %start
  %_2 = xor i1 %_3, true
  br i1 %_2, label %bb2, label %bb3

bb3:                                              ; preds = %bb1
  store ptr null, ptr %0, align 4
  br label %bb4

bb2:                                              ; preds = %bb1
  store ptr %ptr, ptr %_5, align 4
  %1 = load ptr, ptr %_5, align 4, !nonnull !0, !noundef !0
  store ptr %1, ptr %0, align 4
  br label %bb4

bb4:                                              ; preds = %bb3, %bb2
  %2 = load ptr, ptr %0, align 4
  ret ptr %2
}

; core::hint::unreachable_unchecked
; Function Attrs: inlinehint noreturn nounwind
define internal void @_ZN4core4hint21unreachable_unchecked17hc9441351d230f8e9E() unnamed_addr #2 {
start:
  unreachable
}

; core::alloc::layout::Layout::array::inner
; Function Attrs: inlinehint nounwind
define internal { i32, i32 } @_ZN4core5alloc6layout6Layout5array5inner17h6bc778e2507d6998E(i32 %element_size, i32 %align, i32 %n) unnamed_addr #0 {
start:
  %0 = alloca i32, align 4
  %_26 = alloca i32, align 4
  %_24 = alloca i32, align 4
  %_16 = alloca { i32, i32 }, align 4
  %_4 = alloca i8, align 1
  %1 = alloca { i32, i32 }, align 4
  %2 = icmp eq i32 %element_size, 0
  br i1 %2, label %bb1, label %bb2

bb1:                                              ; preds = %start
  store i8 0, ptr %_4, align 1
  br label %bb3

bb2:                                              ; preds = %start
  store i32 %align, ptr %_24, align 4
  %_25 = load i32, ptr %_24, align 4, !range !6, !noundef !0
  %_21 = sub i32 %_25, 1
  %_9 = sub i32 2147483647, %_21
  %_12 = icmp eq i32 %element_size, 0
  %3 = call i1 @llvm.expect.i1(i1 %_12, i1 false)
  br i1 %3, label %panic, label %bb4

bb4:                                              ; preds = %bb2
  %_8 = udiv i32 %_9, %element_size
  %_6 = icmp ugt i32 %n, %_8
  %4 = zext i1 %_6 to i8
  store i8 %4, ptr %_4, align 1
  br label %bb3

panic:                                            ; preds = %bb2
; call core::panicking::panic
  call void @_ZN4core9panicking5panic17h8af046397a2bf65dE(ptr align 1 @str.0, i32 25, ptr align 4 @alloc54) #13
  unreachable

bb3:                                              ; preds = %bb1, %bb4
  %5 = load i8, ptr %_4, align 1, !range !4, !noundef !0
  %6 = trunc i8 %5 to i1
  br i1 %6, label %bb5, label %bb6

bb6:                                              ; preds = %bb3
  %array_size = mul i32 %element_size, %n
  store i32 %align, ptr %_26, align 4
  %_27 = load i32, ptr %_26, align 4, !range !6, !noundef !0
  store i32 %_27, ptr %0, align 4
  %_29 = load i32, ptr %0, align 4, !range !6, !noundef !0
  br label %bb8

bb5:                                              ; preds = %bb3
  %7 = getelementptr inbounds { i32, i32 }, ptr %1, i32 0, i32 1
  store i32 0, ptr %7, align 4
  br label %bb7

bb7:                                              ; preds = %bb8, %bb5
  %8 = getelementptr inbounds { i32, i32 }, ptr %1, i32 0, i32 0
  %9 = load i32, ptr %8, align 4
  %10 = getelementptr inbounds { i32, i32 }, ptr %1, i32 0, i32 1
  %11 = load i32, ptr %10, align 4, !range !1, !noundef !0
  %12 = insertvalue { i32, i32 } undef, i32 %9, 0
  %13 = insertvalue { i32, i32 } %12, i32 %11, 1
  ret { i32, i32 } %13

bb8:                                              ; preds = %bb6
  store i32 %array_size, ptr %_16, align 4
  %14 = getelementptr inbounds { i32, i32 }, ptr %_16, i32 0, i32 1
  store i32 %_29, ptr %14, align 4
  %15 = getelementptr inbounds { i32, i32 }, ptr %_16, i32 0, i32 0
  %16 = load i32, ptr %15, align 4
  %17 = getelementptr inbounds { i32, i32 }, ptr %_16, i32 0, i32 1
  %18 = load i32, ptr %17, align 4, !range !6, !noundef !0
  %19 = getelementptr inbounds { i32, i32 }, ptr %1, i32 0, i32 0
  store i32 %16, ptr %19, align 4
  %20 = getelementptr inbounds { i32, i32 }, ptr %1, i32 0, i32 1
  store i32 %18, ptr %20, align 4
  br label %bb7
}

; core::option::Option<T>::map_or_else
; Function Attrs: inlinehint nounwind
define hidden void @"_ZN4core6option15Option$LT$T$GT$11map_or_else17hfd3dbf6b484527e9E"(ptr sret(%"alloc::string::String") %0, ptr align 1 %1, i32 %2, ptr align 4 %default) unnamed_addr #0 {
start:
  %_12 = alloca i8, align 1
  %_11 = alloca i8, align 1
  %_7 = alloca { ptr, i32 }, align 4
  %self = alloca { ptr, i32 }, align 4
  %3 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 0
  store ptr %1, ptr %3, align 4
  %4 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 1
  store i32 %2, ptr %4, align 4
  store i8 1, ptr %_12, align 1
  store i8 1, ptr %_11, align 1
  %5 = load ptr, ptr %self, align 4
  %6 = icmp eq ptr %5, null
  %_4 = select i1 %6, i32 0, i32 1
  switch i32 %_4, label %bb2 [
    i32 0, label %bb1
    i32 1, label %bb3
  ]

bb2:                                              ; preds = %start
  unreachable

bb1:                                              ; preds = %start
  store i8 0, ptr %_12, align 1
; call alloc::fmt::format::{{closure}}
  call void @"_ZN5alloc3fmt6format28_$u7b$$u7b$closure$u7d$$u7d$17h5b6258ad20ef6338E"(ptr sret(%"alloc::string::String") %0, ptr align 4 %default) #12
  br label %bb5

bb3:                                              ; preds = %start
  %7 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 0
  %t.0 = load ptr, ptr %7, align 4, !nonnull !0, !align !2, !noundef !0
  %8 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 1
  %t.1 = load i32, ptr %8, align 4
  store i8 0, ptr %_11, align 1
  %9 = getelementptr inbounds { ptr, i32 }, ptr %_7, i32 0, i32 0
  store ptr %t.0, ptr %9, align 4
  %10 = getelementptr inbounds { ptr, i32 }, ptr %_7, i32 0, i32 1
  store i32 %t.1, ptr %10, align 4
  %11 = getelementptr inbounds { ptr, i32 }, ptr %_7, i32 0, i32 0
  %12 = load ptr, ptr %11, align 4, !nonnull !0, !align !2, !noundef !0
  %13 = getelementptr inbounds { ptr, i32 }, ptr %_7, i32 0, i32 1
  %14 = load i32, ptr %13, align 4
; call core::ops::function::FnOnce::call_once
  call void @_ZN4core3ops8function6FnOnce9call_once17h2b2563568e3850e1E(ptr sret(%"alloc::string::String") %0, ptr align 1 %12, i32 %14) #12
  br label %bb4

bb4:                                              ; preds = %bb3
  br label %bb9

bb9:                                              ; preds = %bb5, %bb4
  %15 = load i8, ptr %_11, align 1, !range !4, !noundef !0
  %16 = trunc i8 %15 to i1
  br i1 %16, label %bb8, label %bb6

bb5:                                              ; preds = %bb1
  br label %bb9

bb6:                                              ; preds = %bb8, %bb9
  %17 = load i8, ptr %_12, align 1, !range !4, !noundef !0
  %18 = trunc i8 %17 to i1
  br i1 %18, label %bb10, label %bb7

bb8:                                              ; preds = %bb9
  br label %bb6

bb7:                                              ; preds = %bb10, %bb6
  ret void

bb10:                                             ; preds = %bb6
  br label %bb7
}

; <T as core::convert::Into<U>>::into
; Function Attrs: nounwind
define hidden { i32, i32 } @"_ZN50_$LT$T$u20$as$u20$core..convert..Into$LT$U$GT$$GT$4into17h22ba9bc0e36f209bE"(i32 %self.0, i32 %self.1) unnamed_addr #1 {
start:
; call <alloc::collections::TryReserveError as core::convert::From<alloc::collections::TryReserveErrorKind>>::from
  %0 = call { i32, i32 } @"_ZN122_$LT$alloc..collections..TryReserveError$u20$as$u20$core..convert..From$LT$alloc..collections..TryReserveErrorKind$GT$$GT$4from17hb9e77d193c9d53d3E"(i32 %self.0, i32 %self.1) #12
  %1 = extractvalue { i32, i32 } %0, 0
  %2 = extractvalue { i32, i32 } %0, 1
  br label %bb1

bb1:                                              ; preds = %start
  %3 = insertvalue { i32, i32 } undef, i32 %1, 0
  %4 = insertvalue { i32, i32 } %3, i32 %2, 1
  ret { i32, i32 } %4
}

; <T as core::convert::Into<U>>::into
; Function Attrs: nounwind
define hidden ptr @"_ZN50_$LT$T$u20$as$u20$core..convert..Into$LT$U$GT$$GT$4into17h98a00b99f4fda641E"(ptr %self) unnamed_addr #1 {
start:
; call <core::ptr::non_null::NonNull<T> as core::convert::From<core::ptr::unique::Unique<T>>>::from
  %0 = call ptr @"_ZN119_$LT$core..ptr..non_null..NonNull$LT$T$GT$$u20$as$u20$core..convert..From$LT$core..ptr..unique..Unique$LT$T$GT$$GT$$GT$4from17hd5520cc8ec005984E"(ptr %self) #12
  br label %bb1

bb1:                                              ; preds = %start
  ret ptr %0
}

; <T as alloc::slice::hack::ConvertVec>::to_vec
; Function Attrs: inlinehint nounwind
define hidden void @"_ZN52_$LT$T$u20$as$u20$alloc..slice..hack..ConvertVec$GT$6to_vec17he5f2b8d1b94fe6a1E"(ptr sret(%"alloc::vec::Vec<u8>") %v, ptr align 1 %s.0, i32 %s.1) unnamed_addr #0 {
start:
  %_19 = alloca i8, align 1
  store i8 0, ptr %_19, align 1
  %0 = load i8, ptr %_19, align 1, !range !4, !noundef !0
  %1 = trunc i8 %0 to i1
; call alloc::raw_vec::RawVec<T,A>::allocate_in
  %2 = call { ptr, i32 } @"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$11allocate_in17h2fdea351101803beE"(i32 %s.1, i1 zeroext %1) #12
  %_15.0 = extractvalue { ptr, i32 } %2, 0
  %_15.1 = extractvalue { ptr, i32 } %2, 1
  br label %bb1

bb1:                                              ; preds = %start
  %3 = getelementptr inbounds { ptr, i32 }, ptr %v, i32 0, i32 0
  store ptr %_15.0, ptr %3, align 4
  %4 = getelementptr inbounds { ptr, i32 }, ptr %v, i32 0, i32 1
  store i32 %_15.1, ptr %4, align 4
  %5 = getelementptr inbounds %"alloc::vec::Vec<u8>", ptr %v, i32 0, i32 1
  store i32 0, ptr %5, align 4
  %self = load ptr, ptr %v, align 4, !nonnull !0, !noundef !0
; call core::ptr::mut_ptr::<impl *mut T>::is_null
  %_24 = call zeroext i1 @"_ZN4core3ptr7mut_ptr31_$LT$impl$u20$$BP$mut$u20$T$GT$7is_null17hfe72b24f4e3f29bfE"(ptr %self) #12
  br label %bb2

bb2:                                              ; preds = %bb1
  %_23 = xor i1 %_24, true
  call void @llvm.assume(i1 %_23)
  %6 = mul i32 %s.1, 1
  call void @llvm.memcpy.p0.p0.i32(ptr align 1 %self, ptr align 1 %s.0, i32 %6, i1 false)
  %7 = getelementptr inbounds %"alloc::vec::Vec<u8>", ptr %v, i32 0, i32 1
  store i32 %s.1, ptr %7, align 4
  ret void
}

; alloc::fmt::format
; Function Attrs: inlinehint nounwind
define internal void @_ZN5alloc3fmt6format17h3cc198fdc78bf542E(ptr sret(%"alloc::string::String") %0, ptr %args) unnamed_addr #0 {
start:
  %_4 = alloca ptr, align 4
; call core::fmt::Arguments::as_str
  %1 = call { ptr, i32 } @_ZN4core3fmt9Arguments6as_str17h37ded6762b8dd2c5E(ptr align 4 %args) #12
  %_2.0 = extractvalue { ptr, i32 } %1, 0
  %_2.1 = extractvalue { ptr, i32 } %1, 1
  br label %bb1

bb1:                                              ; preds = %start
  store ptr %args, ptr %_4, align 4
  %2 = load ptr, ptr %_4, align 4, !nonnull !0, !align !3, !noundef !0
; call core::option::Option<T>::map_or_else
  call void @"_ZN4core6option15Option$LT$T$GT$11map_or_else17hfd3dbf6b484527e9E"(ptr sret(%"alloc::string::String") %0, ptr align 1 %_2.0, i32 %_2.1, ptr align 4 %2) #12
  br label %bb2

bb2:                                              ; preds = %bb1
  ret void
}

; alloc::fmt::format::{{closure}}
; Function Attrs: inlinehint nounwind
define hidden void @"_ZN5alloc3fmt6format28_$u7b$$u7b$closure$u7d$$u7d$17h5b6258ad20ef6338E"(ptr sret(%"alloc::string::String") %0, ptr align 4 %1) unnamed_addr #0 {
start:
  %_2 = alloca %"core::fmt::Arguments", align 4
  %_1 = alloca ptr, align 4
  store ptr %1, ptr %_1, align 4
  %_3 = load ptr, ptr %_1, align 4, !nonnull !0, !align !3, !noundef !0
  call void @llvm.memcpy.p0.p0.i32(ptr align 4 %_2, ptr align 4 %_3, i32 24, i1 false)
; call alloc::fmt::format::format_inner
  call void @_ZN5alloc3fmt6format12format_inner17ha89d7ca2cd9cfeafE(ptr sret(%"alloc::string::String") %0, ptr %_2) #12
  br label %bb1

bb1:                                              ; preds = %start
  ret void
}

; alloc::str::<impl alloc::borrow::ToOwned for str>::to_owned
; Function Attrs: inlinehint nounwind
define internal void @"_ZN5alloc3str56_$LT$impl$u20$alloc..borrow..ToOwned$u20$for$u20$str$GT$8to_owned17h71729ba34de04762E"(ptr sret(%"alloc::string::String") %0, ptr align 1 %self.0, i32 %self.1) unnamed_addr #0 {
start:
  %1 = alloca { ptr, i32 }, align 4
  %_7 = alloca %"alloc::vec::Vec<u8>", align 4
  %bytes = alloca %"alloc::vec::Vec<u8>", align 4
  %2 = getelementptr inbounds { ptr, i32 }, ptr %1, i32 0, i32 0
  store ptr %self.0, ptr %2, align 4
  %3 = getelementptr inbounds { ptr, i32 }, ptr %1, i32 0, i32 1
  store i32 %self.1, ptr %3, align 4
  %4 = getelementptr inbounds { ptr, i32 }, ptr %1, i32 0, i32 0
  %_4.0 = load ptr, ptr %4, align 4, !nonnull !0, !align !2, !noundef !0
  %5 = getelementptr inbounds { ptr, i32 }, ptr %1, i32 0, i32 1
  %_4.1 = load i32, ptr %5, align 4
  br label %bb2

bb2:                                              ; preds = %start
; call alloc::slice::<impl alloc::borrow::ToOwned for [T]>::to_owned
  call void @"_ZN5alloc5slice64_$LT$impl$u20$alloc..borrow..ToOwned$u20$for$u20$$u5b$T$u5d$$GT$8to_owned17h3c6f281036e3e73aE"(ptr sret(%"alloc::vec::Vec<u8>") %bytes, ptr align 1 %_4.0, i32 %_4.1) #12
  br label %bb1

bb1:                                              ; preds = %bb2
  call void @llvm.memcpy.p0.p0.i32(ptr align 4 %_7, ptr align 4 %bytes, i32 12, i1 false)
  call void @llvm.memcpy.p0.p0.i32(ptr align 4 %0, ptr align 4 %_7, i32 12, i1 false)
  ret void
}

; alloc::alloc::Global::alloc_impl
; Function Attrs: inlinehint nounwind
define internal { ptr, i32 } @_ZN5alloc5alloc6Global10alloc_impl17h747f2de4f980c3a9E(ptr align 1 %self, i32 %0, i32 %1, i1 zeroext %zeroed) unnamed_addr #0 {
start:
  %2 = alloca ptr, align 4
  %_85 = alloca { ptr, i32 }, align 4
  %_84 = alloca %"core::ptr::metadata::PtrRepr<[u8]>", align 4
  %_66 = alloca i32, align 4
  %_59 = alloca i32, align 4
  %_48 = alloca { ptr, i32 }, align 4
  %_47 = alloca %"core::ptr::metadata::PtrRepr<[u8]>", align 4
  %_31 = alloca i32, align 4
  %_24 = alloca { ptr, i32 }, align 4
  %self4 = alloca ptr, align 4
  %self3 = alloca ptr, align 4
  %_15 = alloca ptr, align 4
  %layout2 = alloca { i32, i32 }, align 4
  %layout1 = alloca { i32, i32 }, align 4
  %raw_ptr = alloca ptr, align 4
  %data = alloca ptr, align 4
  %_6 = alloca { ptr, i32 }, align 4
  %3 = alloca { ptr, i32 }, align 4
  %layout = alloca { i32, i32 }, align 4
  %4 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  store i32 %0, ptr %4, align 4
  %5 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  store i32 %1, ptr %5, align 4
  %_4 = load i32, ptr %layout, align 4
  %6 = icmp eq i32 %_4, 0
  br i1 %6, label %bb2, label %bb1

bb2:                                              ; preds = %start
  %7 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  %self8 = load i32, ptr %7, align 4, !range !6, !noundef !0
  store i32 %self8, ptr %_31, align 4
  %_32 = load i32, ptr %_31, align 4, !range !6, !noundef !0
  store i32 %_32, ptr %2, align 4
  %ptr = load ptr, ptr %2, align 4
  br label %bb13

bb1:                                              ; preds = %start
  br i1 %zeroed, label %bb3, label %bb4

bb4:                                              ; preds = %bb1
  %8 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  %9 = load i32, ptr %8, align 4
  %10 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  %11 = load i32, ptr %10, align 4, !range !6, !noundef !0
  %12 = getelementptr inbounds { i32, i32 }, ptr %layout2, i32 0, i32 0
  store i32 %9, ptr %12, align 4
  %13 = getelementptr inbounds { i32, i32 }, ptr %layout2, i32 0, i32 1
  store i32 %11, ptr %13, align 4
  %_61 = load i32, ptr %layout2, align 4
  %14 = getelementptr inbounds { i32, i32 }, ptr %layout2, i32 0, i32 1
  %self6 = load i32, ptr %14, align 4, !range !6, !noundef !0
  store i32 %self6, ptr %_66, align 4
  %_67 = load i32, ptr %_66, align 4, !range !6, !noundef !0
  %15 = call ptr @__rust_alloc(i32 %_61, i32 %_67) #12
  store ptr %15, ptr %raw_ptr, align 4
  br label %bb15

bb3:                                              ; preds = %bb1
  %16 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  %17 = load i32, ptr %16, align 4
  %18 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  %19 = load i32, ptr %18, align 4, !range !6, !noundef !0
  %20 = getelementptr inbounds { i32, i32 }, ptr %layout1, i32 0, i32 0
  store i32 %17, ptr %20, align 4
  %21 = getelementptr inbounds { i32, i32 }, ptr %layout1, i32 0, i32 1
  store i32 %19, ptr %21, align 4
  %_54 = load i32, ptr %layout1, align 4
  %22 = getelementptr inbounds { i32, i32 }, ptr %layout1, i32 0, i32 1
  %self5 = load i32, ptr %22, align 4, !range !6, !noundef !0
  store i32 %self5, ptr %_59, align 4
  %_60 = load i32, ptr %_59, align 4, !range !6, !noundef !0
  %23 = call ptr @__rust_alloc_zeroed(i32 %_54, i32 %_60) #12
  store ptr %23, ptr %raw_ptr, align 4
  br label %bb14

bb14:                                             ; preds = %bb3
  br label %bb5

bb5:                                              ; preds = %bb15, %bb14
  %_18 = load ptr, ptr %raw_ptr, align 4
; call core::ptr::non_null::NonNull<T>::new
  %24 = call ptr @"_ZN4core3ptr8non_null16NonNull$LT$T$GT$3new17hb1b6128fd5ee6c60E"(ptr %_18) #12
  store ptr %24, ptr %self4, align 4
  br label %bb6

bb15:                                             ; preds = %bb4
  br label %bb5

bb6:                                              ; preds = %bb5
  %25 = load ptr, ptr %self4, align 4
  %26 = icmp eq ptr %25, null
  %_68 = select i1 %26, i32 0, i32 1
  switch i32 %_68, label %bb17 [
    i32 0, label %bb16
    i32 1, label %bb18
  ]

bb17:                                             ; preds = %bb6
  unreachable

bb16:                                             ; preds = %bb6
  store ptr null, ptr %self3, align 4
  br label %bb19

bb18:                                             ; preds = %bb6
  %v = load ptr, ptr %self4, align 4, !nonnull !0, !noundef !0
  store ptr %v, ptr %self3, align 4
  br label %bb19

bb19:                                             ; preds = %bb16, %bb18
  %27 = load ptr, ptr %self3, align 4
  %28 = icmp eq ptr %27, null
  %_71 = select i1 %28, i32 1, i32 0
  switch i32 %_71, label %bb21 [
    i32 0, label %bb22
    i32 1, label %bb20
  ]

bb21:                                             ; preds = %bb19
  unreachable

bb22:                                             ; preds = %bb19
  %v7 = load ptr, ptr %self3, align 4, !nonnull !0, !noundef !0
  store ptr %v7, ptr %_15, align 4
  br label %bb7

bb20:                                             ; preds = %bb19
  store ptr null, ptr %_15, align 4
  br label %bb7

bb7:                                              ; preds = %bb22, %bb20
  %29 = load ptr, ptr %_15, align 4
  %30 = icmp eq ptr %29, null
  %_20 = select i1 %30, i32 1, i32 0
  switch i32 %_20, label %bb9 [
    i32 0, label %bb8
    i32 1, label %bb10
  ]

bb9:                                              ; preds = %bb7
  unreachable

bb8:                                              ; preds = %bb7
  %val = load ptr, ptr %_15, align 4, !nonnull !0, !noundef !0
  store ptr %val, ptr %_85, align 4
  %31 = getelementptr inbounds { ptr, i32 }, ptr %_85, i32 0, i32 1
  store i32 %_4, ptr %31, align 4
  %32 = getelementptr inbounds { ptr, i32 }, ptr %_85, i32 0, i32 0
  %33 = load ptr, ptr %32, align 4
  %34 = getelementptr inbounds { ptr, i32 }, ptr %_85, i32 0, i32 1
  %35 = load i32, ptr %34, align 4
  %36 = getelementptr inbounds { ptr, i32 }, ptr %_84, i32 0, i32 0
  store ptr %33, ptr %36, align 4
  %37 = getelementptr inbounds { ptr, i32 }, ptr %_84, i32 0, i32 1
  store i32 %35, ptr %37, align 4
  %38 = getelementptr inbounds { ptr, i32 }, ptr %_84, i32 0, i32 0
  %ptr.0 = load ptr, ptr %38, align 4
  %39 = getelementptr inbounds { ptr, i32 }, ptr %_84, i32 0, i32 1
  %ptr.1 = load i32, ptr %39, align 4
  %40 = getelementptr inbounds { ptr, i32 }, ptr %_24, i32 0, i32 0
  store ptr %ptr.0, ptr %40, align 4
  %41 = getelementptr inbounds { ptr, i32 }, ptr %_24, i32 0, i32 1
  store i32 %ptr.1, ptr %41, align 4
  %42 = getelementptr inbounds { ptr, i32 }, ptr %_24, i32 0, i32 0
  %43 = load ptr, ptr %42, align 4, !nonnull !0, !noundef !0
  %44 = getelementptr inbounds { ptr, i32 }, ptr %_24, i32 0, i32 1
  %45 = load i32, ptr %44, align 4
  %46 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 0
  store ptr %43, ptr %46, align 4
  %47 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 1
  store i32 %45, ptr %47, align 4
  br label %bb11

bb10:                                             ; preds = %bb7
  store ptr null, ptr %3, align 4
  br label %bb12

bb12:                                             ; preds = %bb11, %bb10
  %48 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 0
  %49 = load ptr, ptr %48, align 4
  %50 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 1
  %51 = load i32, ptr %50, align 4
  %52 = insertvalue { ptr, i32 } undef, ptr %49, 0
  %53 = insertvalue { ptr, i32 } %52, i32 %51, 1
  ret { ptr, i32 } %53

bb11:                                             ; preds = %bb13, %bb8
  br label %bb12

bb13:                                             ; preds = %bb2
  store ptr %ptr, ptr %data, align 4
  %self9 = load ptr, ptr %data, align 4, !nonnull !0, !noundef !0
  store ptr %self9, ptr %_48, align 4
  %54 = getelementptr inbounds { ptr, i32 }, ptr %_48, i32 0, i32 1
  store i32 0, ptr %54, align 4
  %55 = getelementptr inbounds { ptr, i32 }, ptr %_48, i32 0, i32 0
  %56 = load ptr, ptr %55, align 4
  %57 = getelementptr inbounds { ptr, i32 }, ptr %_48, i32 0, i32 1
  %58 = load i32, ptr %57, align 4
  %59 = getelementptr inbounds { ptr, i32 }, ptr %_47, i32 0, i32 0
  store ptr %56, ptr %59, align 4
  %60 = getelementptr inbounds { ptr, i32 }, ptr %_47, i32 0, i32 1
  store i32 %58, ptr %60, align 4
  %61 = getelementptr inbounds { ptr, i32 }, ptr %_47, i32 0, i32 0
  %ptr.010 = load ptr, ptr %61, align 4
  %62 = getelementptr inbounds { ptr, i32 }, ptr %_47, i32 0, i32 1
  %ptr.111 = load i32, ptr %62, align 4
  %63 = getelementptr inbounds { ptr, i32 }, ptr %_6, i32 0, i32 0
  store ptr %ptr.010, ptr %63, align 4
  %64 = getelementptr inbounds { ptr, i32 }, ptr %_6, i32 0, i32 1
  store i32 %ptr.111, ptr %64, align 4
  %65 = getelementptr inbounds { ptr, i32 }, ptr %_6, i32 0, i32 0
  %66 = load ptr, ptr %65, align 4, !nonnull !0, !noundef !0
  %67 = getelementptr inbounds { ptr, i32 }, ptr %_6, i32 0, i32 1
  %68 = load i32, ptr %67, align 4
  %69 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 0
  store ptr %66, ptr %69, align 4
  %70 = getelementptr inbounds { ptr, i32 }, ptr %3, i32 0, i32 1
  store i32 %68, ptr %70, align 4
  br label %bb11
}

; alloc::slice::<impl alloc::borrow::ToOwned for [T]>::to_owned
; Function Attrs: nounwind
define hidden void @"_ZN5alloc5slice64_$LT$impl$u20$alloc..borrow..ToOwned$u20$for$u20$$u5b$T$u5d$$GT$8to_owned17h3c6f281036e3e73aE"(ptr sret(%"alloc::vec::Vec<u8>") %0, ptr align 1 %self.0, i32 %self.1) unnamed_addr #1 {
start:
; call <T as alloc::slice::hack::ConvertVec>::to_vec
  call void @"_ZN52_$LT$T$u20$as$u20$alloc..slice..hack..ConvertVec$GT$6to_vec17he5f2b8d1b94fe6a1E"(ptr sret(%"alloc::vec::Vec<u8>") %0, ptr align 1 %self.0, i32 %self.1) #12
  br label %bb1

bb1:                                              ; preds = %start
  ret void
}

; alloc::raw_vec::RawVec<T,A>::allocate_in
; Function Attrs: nounwind
define hidden { ptr, i32 } @"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$11allocate_in17h2fdea351101803beE"(i32 %capacity, i1 zeroext %0) unnamed_addr #1 {
start:
  %1 = alloca i32, align 4
  %_59 = alloca ptr, align 4
  %_50 = alloca { i32, i32 }, align 4
  %self = alloca ptr, align 4
  %_31 = alloca ptr, align 4
  %result = alloca { ptr, i32 }, align 4
  %_15 = alloca { i32, i32 }, align 4
  %_10 = alloca { i32, i32 }, align 4
  %layout = alloca { i32, i32 }, align 4
  %_4 = alloca i8, align 1
  %2 = alloca { ptr, i32 }, align 4
  %alloc = alloca %"alloc::alloc::Global", align 1
  %init = alloca i8, align 1
  %3 = zext i1 %0 to i8
  store i8 %3, ptr %init, align 1
  br i1 false, label %bb1, label %bb2

bb1:                                              ; preds = %start
  store i8 1, ptr %_4, align 1
  br label %bb3

bb2:                                              ; preds = %start
  %_6 = icmp eq i32 %capacity, 0
  %4 = zext i1 %_6 to i8
  store i8 %4, ptr %_4, align 1
  br label %bb3

bb3:                                              ; preds = %bb1, %bb2
  %5 = load i8, ptr %_4, align 1, !range !4, !noundef !0
  %6 = trunc i8 %5 to i1
  br i1 %6, label %bb4, label %bb6

bb6:                                              ; preds = %bb3
  store i32 1, ptr %1, align 4
  %_38 = load i32, ptr %1, align 4, !range !6, !noundef !0
  br label %bb24

bb4:                                              ; preds = %bb3
; call alloc::raw_vec::RawVec<T,A>::new_in
  %7 = call { ptr, i32 } @"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$6new_in17h8655478fc5b7abfeE"() #12
  store { ptr, i32 } %7, ptr %2, align 4
  br label %bb5

bb5:                                              ; preds = %bb4
  br label %bb22

bb22:                                             ; preds = %bb21, %bb5
  %8 = getelementptr inbounds { ptr, i32 }, ptr %2, i32 0, i32 0
  %9 = load ptr, ptr %8, align 4, !nonnull !0, !noundef !0
  %10 = getelementptr inbounds { ptr, i32 }, ptr %2, i32 0, i32 1
  %11 = load i32, ptr %10, align 4
  %12 = insertvalue { ptr, i32 } undef, ptr %9, 0
  %13 = insertvalue { ptr, i32 } %12, i32 %11, 1
  ret { ptr, i32 } %13

bb24:                                             ; preds = %bb6
; call core::alloc::layout::Layout::array::inner
  %14 = call { i32, i32 } @_ZN4core5alloc6layout6Layout5array5inner17h6bc778e2507d6998E(i32 1, i32 %_38, i32 %capacity) #12
  store { i32, i32 } %14, ptr %_10, align 4
  br label %bb23

bb23:                                             ; preds = %bb24
  %15 = getelementptr inbounds { i32, i32 }, ptr %_10, i32 0, i32 1
  %16 = load i32, ptr %15, align 4, !range !1, !noundef !0
  %17 = icmp eq i32 %16, 0
  %_12 = select i1 %17, i32 1, i32 0
  switch i32 %_12, label %bb8 [
    i32 0, label %bb9
    i32 1, label %bb7
  ]

bb8:                                              ; preds = %bb23
  unreachable

bb9:                                              ; preds = %bb23
  %18 = getelementptr inbounds { i32, i32 }, ptr %_10, i32 0, i32 0
  %layout.0 = load i32, ptr %18, align 4
  %19 = getelementptr inbounds { i32, i32 }, ptr %_10, i32 0, i32 1
  %layout.1 = load i32, ptr %19, align 4, !range !6, !noundef !0
  %20 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  store i32 %layout.0, ptr %20, align 4
  %21 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  store i32 %layout.1, ptr %21, align 4
  %alloc_size = load i32, ptr %layout, align 4
  %_46 = icmp ugt i32 %alloc_size, 2147483647
  br i1 %_46, label %bb25, label %bb27

bb7:                                              ; preds = %bb23
; call alloc::raw_vec::capacity_overflow
  call void @_ZN5alloc7raw_vec17capacity_overflow17h4b275cb3c10b0a78E() #13
  unreachable

bb27:                                             ; preds = %bb9
  %22 = getelementptr inbounds { i32, i32 }, ptr %_15, i32 0, i32 1
  store i32 -2147483647, ptr %22, align 4
  br label %bb28

bb25:                                             ; preds = %bb9
  %23 = getelementptr inbounds { i32, i32 }, ptr %_50, i32 0, i32 1
  store i32 0, ptr %23, align 4
  %24 = getelementptr inbounds { i32, i32 }, ptr %_50, i32 0, i32 0
  %25 = load i32, ptr %24, align 4
  %26 = getelementptr inbounds { i32, i32 }, ptr %_50, i32 0, i32 1
  %27 = load i32, ptr %26, align 4, !range !1, !noundef !0
; call <T as core::convert::Into<U>>::into
  %28 = call { i32, i32 } @"_ZN50_$LT$T$u20$as$u20$core..convert..Into$LT$U$GT$$GT$4into17h22ba9bc0e36f209bE"(i32 %25, i32 %27) #12
  %_49.0 = extractvalue { i32, i32 } %28, 0
  %_49.1 = extractvalue { i32, i32 } %28, 1
  br label %bb26

bb26:                                             ; preds = %bb25
  %29 = getelementptr inbounds { i32, i32 }, ptr %_15, i32 0, i32 0
  store i32 %_49.0, ptr %29, align 4
  %30 = getelementptr inbounds { i32, i32 }, ptr %_15, i32 0, i32 1
  store i32 %_49.1, ptr %30, align 4
  br label %bb28

bb28:                                             ; preds = %bb27, %bb26
  %31 = getelementptr inbounds { i32, i32 }, ptr %_15, i32 0, i32 1
  %32 = load i32, ptr %31, align 4, !range !7, !noundef !0
  %33 = sub i32 %32, -2147483647
  %34 = icmp eq i32 %33, 0
  %_18 = select i1 %34, i32 0, i32 1
  switch i32 %_18, label %bb11 [
    i32 0, label %bb12
    i32 1, label %bb10
  ]

bb11:                                             ; preds = %bb28
  unreachable

bb12:                                             ; preds = %bb28
  %35 = load i8, ptr %init, align 1, !range !4, !noundef !0
  %36 = trunc i8 %35 to i1
  %_21 = zext i1 %36 to i32
  switch i32 %_21, label %bb14 [
    i32 0, label %bb15
    i32 1, label %bb13
  ]

bb10:                                             ; preds = %bb28
; call alloc::raw_vec::capacity_overflow
  call void @_ZN5alloc7raw_vec17capacity_overflow17h4b275cb3c10b0a78E() #13
  unreachable

bb14:                                             ; preds = %bb12
  unreachable

bb15:                                             ; preds = %bb12
  %37 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  %_23.0 = load i32, ptr %37, align 4
  %38 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  %_23.1 = load i32, ptr %38, align 4, !range !6, !noundef !0
; call <alloc::alloc::Global as core::alloc::Allocator>::allocate
  %39 = call { ptr, i32 } @"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$8allocate17h4d29635e7a50fbb2E"(ptr align 1 %alloc, i32 %_23.0, i32 %_23.1) #12
  store { ptr, i32 } %39, ptr %result, align 4
  br label %bb16

bb13:                                             ; preds = %bb12
  %40 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  %_25.0 = load i32, ptr %40, align 4
  %41 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  %_25.1 = load i32, ptr %41, align 4, !range !6, !noundef !0
; call <alloc::alloc::Global as core::alloc::Allocator>::allocate_zeroed
  %42 = call { ptr, i32 } @"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$15allocate_zeroed17h7997fefd68e9637aE"(ptr align 1 %alloc, i32 %_25.0, i32 %_25.1) #12
  store { ptr, i32 } %42, ptr %result, align 4
  br label %bb17

bb17:                                             ; preds = %bb13
  br label %bb18

bb18:                                             ; preds = %bb16, %bb17
  %43 = load ptr, ptr %result, align 4
  %44 = icmp eq ptr %43, null
  %_27 = select i1 %44, i32 1, i32 0
  switch i32 %_27, label %bb20 [
    i32 0, label %bb21
    i32 1, label %bb19
  ]

bb16:                                             ; preds = %bb15
  br label %bb18

bb20:                                             ; preds = %bb18
  unreachable

bb21:                                             ; preds = %bb18
  %45 = getelementptr inbounds { ptr, i32 }, ptr %result, i32 0, i32 0
  %ptr.0 = load ptr, ptr %45, align 4, !nonnull !0, !noundef !0
  %46 = getelementptr inbounds { ptr, i32 }, ptr %result, i32 0, i32 1
  %ptr.1 = load i32, ptr %46, align 4
  store ptr %ptr.0, ptr %self, align 4
  %_58 = load ptr, ptr %self, align 4
  store ptr %_58, ptr %_59, align 4
  %47 = load ptr, ptr %_59, align 4, !nonnull !0, !noundef !0
  store ptr %47, ptr %_31, align 4
  %48 = load ptr, ptr %_31, align 4, !nonnull !0, !noundef !0
  store ptr %48, ptr %2, align 4
  %49 = getelementptr inbounds { ptr, i32 }, ptr %2, i32 0, i32 1
  store i32 %capacity, ptr %49, align 4
  br label %bb22

bb19:                                             ; preds = %bb18
  %50 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  %_30.0 = load i32, ptr %50, align 4
  %51 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  %_30.1 = load i32, ptr %51, align 4, !range !6, !noundef !0
; call alloc::alloc::handle_alloc_error
  call void @_ZN5alloc5alloc18handle_alloc_error17h7458deb484270144E(i32 %_30.0, i32 %_30.1) #13
  unreachable
}

; alloc::raw_vec::RawVec<T,A>::current_memory
; Function Attrs: nounwind
define hidden void @"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$14current_memory17hbf076012668daa65E"(ptr sret(%"core::option::Option<(core::ptr::non_null::NonNull<u8>, core::alloc::layout::Layout)>") %0, ptr align 4 %self) unnamed_addr #1 {
start:
  %1 = alloca i32, align 4
  %pointer = alloca ptr, align 4
  %_11 = alloca ptr, align 4
  %_9 = alloca { ptr, { i32, i32 } }, align 4
  %self1 = alloca { i32, i32 }, align 4
  %_2 = alloca i8, align 1
  br i1 false, label %bb1, label %bb2

bb1:                                              ; preds = %start
  store i8 1, ptr %_2, align 1
  br label %bb3

bb2:                                              ; preds = %start
  %2 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 1
  %_5 = load i32, ptr %2, align 4
  %_4 = icmp eq i32 %_5, 0
  %3 = zext i1 %_4 to i8
  store i8 %3, ptr %_2, align 1
  br label %bb3

bb3:                                              ; preds = %bb1, %bb2
  %4 = load i8, ptr %_2, align 1, !range !4, !noundef !0
  %5 = trunc i8 %4 to i1
  br i1 %5, label %bb4, label %bb5

bb5:                                              ; preds = %bb3
  %6 = getelementptr inbounds { ptr, i32 }, ptr %self, i32 0, i32 1
  %n = load i32, ptr %6, align 4
  store i32 1, ptr %1, align 4
  %_15 = load i32, ptr %1, align 4, !range !6, !noundef !0
  br label %bb9

bb4:                                              ; preds = %bb3
  %7 = getelementptr inbounds %"core::option::Option<(core::ptr::non_null::NonNull<u8>, core::alloc::layout::Layout)>", ptr %0, i32 0, i32 1
  store i32 0, ptr %7, align 4
  br label %bb7

bb7:                                              ; preds = %bb6, %bb4
  ret void

bb9:                                              ; preds = %bb5
; call core::alloc::layout::Layout::array::inner
  %8 = call { i32, i32 } @_ZN4core5alloc6layout6Layout5array5inner17h6bc778e2507d6998E(i32 1, i32 %_15, i32 %n) #12
  store { i32, i32 } %8, ptr %self1, align 4
  br label %bb8

bb8:                                              ; preds = %bb9
  %9 = getelementptr inbounds { i32, i32 }, ptr %self1, i32 0, i32 1
  %10 = load i32, ptr %9, align 4, !range !1, !noundef !0
  %11 = icmp eq i32 %10, 0
  %_23 = select i1 %11, i32 1, i32 0
  switch i32 %_23, label %bb11 [
    i32 0, label %bb12
    i32 1, label %bb10
  ]

bb11:                                             ; preds = %bb8
  unreachable

bb12:                                             ; preds = %bb8
  %12 = getelementptr inbounds { i32, i32 }, ptr %self1, i32 0, i32 0
  %t.0 = load i32, ptr %12, align 4
  %13 = getelementptr inbounds { i32, i32 }, ptr %self1, i32 0, i32 1
  %t.1 = load i32, ptr %13, align 4, !range !6, !noundef !0
  %self2 = load ptr, ptr %self, align 4, !nonnull !0, !noundef !0
  store ptr %self2, ptr %pointer, align 4
  %_35 = load ptr, ptr %pointer, align 4, !nonnull !0, !noundef !0
  store ptr %_35, ptr %_11, align 4
  %14 = load ptr, ptr %_11, align 4, !nonnull !0, !noundef !0
; call <T as core::convert::Into<U>>::into
  %_10 = call ptr @"_ZN50_$LT$T$u20$as$u20$core..convert..Into$LT$U$GT$$GT$4into17h98a00b99f4fda641E"(ptr %14) #12
  br label %bb6

bb10:                                             ; preds = %bb8
; call core::hint::unreachable_unchecked
  call void @_ZN4core4hint21unreachable_unchecked17hc9441351d230f8e9E() #13
  unreachable

bb6:                                              ; preds = %bb12
  store ptr %_10, ptr %_9, align 4
  %15 = getelementptr inbounds { ptr, { i32, i32 } }, ptr %_9, i32 0, i32 1
  %16 = getelementptr inbounds { i32, i32 }, ptr %15, i32 0, i32 0
  store i32 %t.0, ptr %16, align 4
  %17 = getelementptr inbounds { i32, i32 }, ptr %15, i32 0, i32 1
  store i32 %t.1, ptr %17, align 4
  call void @llvm.memcpy.p0.p0.i32(ptr align 4 %0, ptr align 4 %_9, i32 12, i1 false)
  br label %bb7
}

; alloc::raw_vec::RawVec<T,A>::new_in
; Function Attrs: nounwind
define hidden { ptr, i32 } @"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$6new_in17h8655478fc5b7abfeE"() unnamed_addr #1 {
start:
  %0 = alloca ptr, align 4
  %pointer = alloca ptr, align 4
  %_2 = alloca ptr, align 4
  %1 = alloca { ptr, i32 }, align 4
  store i32 1, ptr %0, align 4
  %ptr = load ptr, ptr %0, align 4
  br label %bb1

bb1:                                              ; preds = %start
  store ptr %ptr, ptr %pointer, align 4
  %_12 = load ptr, ptr %pointer, align 4, !nonnull !0, !noundef !0
  store ptr %_12, ptr %_2, align 4
  %2 = load ptr, ptr %_2, align 4, !nonnull !0, !noundef !0
  store ptr %2, ptr %1, align 4
  %3 = getelementptr inbounds { ptr, i32 }, ptr %1, i32 0, i32 1
  store i32 0, ptr %3, align 4
  %4 = getelementptr inbounds { ptr, i32 }, ptr %1, i32 0, i32 0
  %5 = load ptr, ptr %4, align 4, !nonnull !0, !noundef !0
  %6 = getelementptr inbounds { ptr, i32 }, ptr %1, i32 0, i32 1
  %7 = load i32, ptr %6, align 4
  %8 = insertvalue { ptr, i32 } undef, ptr %5, 0
  %9 = insertvalue { ptr, i32 } %8, i32 %7, 1
  ret { ptr, i32 } %9
}

; <alloc::alloc::Global as core::alloc::Allocator>::deallocate
; Function Attrs: inlinehint nounwind
define internal void @"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17hb5a35526efb03d31E"(ptr align 1 %self, ptr %ptr, i32 %0, i32 %1) unnamed_addr #0 {
start:
  %_16 = alloca i32, align 4
  %layout1 = alloca { i32, i32 }, align 4
  %layout = alloca { i32, i32 }, align 4
  %2 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  store i32 %0, ptr %2, align 4
  %3 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  store i32 %1, ptr %3, align 4
  %_4 = load i32, ptr %layout, align 4
  %4 = icmp eq i32 %_4, 0
  br i1 %4, label %bb2, label %bb1

bb2:                                              ; preds = %start
  br label %bb3

bb1:                                              ; preds = %start
  %5 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 0
  %6 = load i32, ptr %5, align 4
  %7 = getelementptr inbounds { i32, i32 }, ptr %layout, i32 0, i32 1
  %8 = load i32, ptr %7, align 4, !range !6, !noundef !0
  %9 = getelementptr inbounds { i32, i32 }, ptr %layout1, i32 0, i32 0
  store i32 %6, ptr %9, align 4
  %10 = getelementptr inbounds { i32, i32 }, ptr %layout1, i32 0, i32 1
  store i32 %8, ptr %10, align 4
  %_11 = load i32, ptr %layout1, align 4
  %11 = getelementptr inbounds { i32, i32 }, ptr %layout1, i32 0, i32 1
  %self2 = load i32, ptr %11, align 4, !range !6, !noundef !0
  store i32 %self2, ptr %_16, align 4
  %_17 = load i32, ptr %_16, align 4, !range !6, !noundef !0
  call void @__rust_dealloc(ptr %ptr, i32 %_11, i32 %_17) #12
  br label %bb4

bb4:                                              ; preds = %bb1
  br label %bb3

bb3:                                              ; preds = %bb2, %bb4
  ret void
}

; <alloc::alloc::Global as core::alloc::Allocator>::allocate_zeroed
; Function Attrs: inlinehint nounwind
define internal { ptr, i32 } @"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$15allocate_zeroed17h7997fefd68e9637aE"(ptr align 1 %self, i32 %layout.0, i32 %layout.1) unnamed_addr #0 {
start:
; call alloc::alloc::Global::alloc_impl
  %0 = call { ptr, i32 } @_ZN5alloc5alloc6Global10alloc_impl17h747f2de4f980c3a9E(ptr align 1 %self, i32 %layout.0, i32 %layout.1, i1 zeroext true) #12
  %1 = extractvalue { ptr, i32 } %0, 0
  %2 = extractvalue { ptr, i32 } %0, 1
  br label %bb1

bb1:                                              ; preds = %start
  %3 = insertvalue { ptr, i32 } undef, ptr %1, 0
  %4 = insertvalue { ptr, i32 } %3, i32 %2, 1
  ret { ptr, i32 } %4
}

; <alloc::alloc::Global as core::alloc::Allocator>::allocate
; Function Attrs: inlinehint nounwind
define internal { ptr, i32 } @"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$8allocate17h4d29635e7a50fbb2E"(ptr align 1 %self, i32 %layout.0, i32 %layout.1) unnamed_addr #0 {
start:
; call alloc::alloc::Global::alloc_impl
  %0 = call { ptr, i32 } @_ZN5alloc5alloc6Global10alloc_impl17h747f2de4f980c3a9E(ptr align 1 %self, i32 %layout.0, i32 %layout.1, i1 zeroext false) #12
  %1 = extractvalue { ptr, i32 } %0, 0
  %2 = extractvalue { ptr, i32 } %0, 1
  br label %bb1

bb1:                                              ; preds = %start
  %3 = insertvalue { ptr, i32 } undef, ptr %1, 0
  %4 = insertvalue { ptr, i32 } %3, i32 %2, 1
  ret { ptr, i32 } %4
}

; <alloc::vec::Vec<T,A> as core::ops::drop::Drop>::drop
; Function Attrs: nounwind
define hidden void @"_ZN70_$LT$alloc..vec..Vec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17h14272de0bf59396cE"(ptr align 4 %self) unnamed_addr #1 {
start:
  %_18 = alloca { ptr, i32 }, align 4
  %_17 = alloca %"core::ptr::metadata::PtrRepr<[u8]>", align 4
  %self1 = load ptr, ptr %self, align 4, !nonnull !0, !noundef !0
; call core::ptr::mut_ptr::<impl *mut T>::is_null
  %_8 = call zeroext i1 @"_ZN4core3ptr7mut_ptr31_$LT$impl$u20$$BP$mut$u20$T$GT$7is_null17hfe72b24f4e3f29bfE"(ptr %self1) #12
  br label %bb2

bb2:                                              ; preds = %start
  %_7 = xor i1 %_8, true
  call void @llvm.assume(i1 %_7)
  %0 = getelementptr inbounds %"alloc::vec::Vec<u8>", ptr %self, i32 0, i32 1
  %len = load i32, ptr %0, align 4
  store ptr %self1, ptr %_18, align 4
  %1 = getelementptr inbounds { ptr, i32 }, ptr %_18, i32 0, i32 1
  store i32 %len, ptr %1, align 4
  %2 = getelementptr inbounds { ptr, i32 }, ptr %_18, i32 0, i32 0
  %3 = load ptr, ptr %2, align 4
  %4 = getelementptr inbounds { ptr, i32 }, ptr %_18, i32 0, i32 1
  %5 = load i32, ptr %4, align 4
  %6 = getelementptr inbounds { ptr, i32 }, ptr %_17, i32 0, i32 0
  store ptr %3, ptr %6, align 4
  %7 = getelementptr inbounds { ptr, i32 }, ptr %_17, i32 0, i32 1
  store i32 %5, ptr %7, align 4
  %8 = getelementptr inbounds { ptr, i32 }, ptr %_17, i32 0, i32 0
  %_2.0 = load ptr, ptr %8, align 4
  %9 = getelementptr inbounds { ptr, i32 }, ptr %_17, i32 0, i32 1
  %_2.1 = load i32, ptr %9, align 4
  br label %bb1

bb1:                                              ; preds = %bb2
  ret void
}

; <alloc::raw_vec::RawVec<T,A> as core::ops::drop::Drop>::drop
; Function Attrs: nounwind
define hidden void @"_ZN77_$LT$alloc..raw_vec..RawVec$LT$T$C$A$GT$$u20$as$u20$core..ops..drop..Drop$GT$4drop17ha9deebd2f898ac31E"(ptr align 4 %self) unnamed_addr #1 {
start:
  %_2 = alloca %"core::option::Option<(core::ptr::non_null::NonNull<u8>, core::alloc::layout::Layout)>", align 4
; call alloc::raw_vec::RawVec<T,A>::current_memory
  call void @"_ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$14current_memory17hbf076012668daa65E"(ptr sret(%"core::option::Option<(core::ptr::non_null::NonNull<u8>, core::alloc::layout::Layout)>") %_2, ptr align 4 %self) #12
  br label %bb1

bb1:                                              ; preds = %start
  %0 = getelementptr inbounds %"core::option::Option<(core::ptr::non_null::NonNull<u8>, core::alloc::layout::Layout)>", ptr %_2, i32 0, i32 1
  %1 = load i32, ptr %0, align 4, !range !1, !noundef !0
  %2 = icmp eq i32 %1, 0
  %_4 = select i1 %2, i32 0, i32 1
  %3 = icmp eq i32 %_4, 1
  br i1 %3, label %bb2, label %bb4

bb2:                                              ; preds = %bb1
  %ptr = load ptr, ptr %_2, align 4, !nonnull !0, !noundef !0
  %4 = getelementptr inbounds { ptr, { i32, i32 } }, ptr %_2, i32 0, i32 1
  %5 = getelementptr inbounds { i32, i32 }, ptr %4, i32 0, i32 0
  %layout.0 = load i32, ptr %5, align 4
  %6 = getelementptr inbounds { i32, i32 }, ptr %4, i32 0, i32 1
  %layout.1 = load i32, ptr %6, align 4, !range !6, !noundef !0
; call <alloc::alloc::Global as core::alloc::Allocator>::deallocate
  call void @"_ZN63_$LT$alloc..alloc..Global$u20$as$u20$core..alloc..Allocator$GT$10deallocate17hb5a35526efb03d31E"(ptr align 1 %self, ptr %ptr, i32 %layout.0, i32 %layout.1) #12
  br label %bb3

bb4:                                              ; preds = %bb3, %bb1
  ret void

bb3:                                              ; preds = %bb2
  br label %bb4
}

; probe1::probe
; Function Attrs: nounwind
define hidden void @_ZN6probe15probe17hc7615017673276a7E() unnamed_addr #1 {
start:
  %_10 = alloca [1 x { ptr, ptr }], align 4
  %_3 = alloca %"core::fmt::Arguments", align 4
  %res = alloca %"alloc::string::String", align 4
  %_1 = alloca %"alloc::string::String", align 4
; call core::fmt::ArgumentV1::new_lower_exp
  %0 = call { ptr, ptr } @_ZN4core3fmt10ArgumentV113new_lower_exp17h1d2faba81e2c386cE(ptr align 4 @alloc6) #12
  %_11.0 = extractvalue { ptr, ptr } %0, 0
  %_11.1 = extractvalue { ptr, ptr } %0, 1
  br label %bb1

bb1:                                              ; preds = %start
  %1 = getelementptr inbounds [1 x { ptr, ptr }], ptr %_10, i32 0, i32 0
  %2 = getelementptr inbounds { ptr, ptr }, ptr %1, i32 0, i32 0
  store ptr %_11.0, ptr %2, align 4
  %3 = getelementptr inbounds { ptr, ptr }, ptr %1, i32 0, i32 1
  store ptr %_11.1, ptr %3, align 4
; call core::fmt::Arguments::new_v1
  call void @_ZN4core3fmt9Arguments6new_v117h2166c1f8b772fe6cE(ptr sret(%"core::fmt::Arguments") %_3, ptr align 4 @alloc4, i32 1, ptr align 4 %_10, i32 1) #12
  br label %bb2

bb2:                                              ; preds = %bb1
; call alloc::fmt::format
  call void @_ZN5alloc3fmt6format17h3cc198fdc78bf542E(ptr sret(%"alloc::string::String") %res, ptr %_3) #12
  br label %bb3

bb3:                                              ; preds = %bb2
  call void @llvm.memcpy.p0.p0.i32(ptr align 4 %_1, ptr align 4 %res, i32 12, i1 false)
; call core::ptr::drop_in_place<alloc::string::String>
  call void @"_ZN4core3ptr42drop_in_place$LT$alloc..string..String$GT$17h453ab2d80895cd1eE"(ptr %_1) #12
  br label %bb4

bb4:                                              ; preds = %bb3
  ret void
}

; core::fmt::num::imp::<impl core::fmt::LowerExp for isize>::fmt
; Function Attrs: nounwind
declare dso_local zeroext i1 @"_ZN4core3fmt3num3imp55_$LT$impl$u20$core..fmt..LowerExp$u20$for$u20$isize$GT$3fmt17hbb4522c979bc4086E"(ptr align 4, ptr align 4) unnamed_addr #1

; core::panicking::panic_fmt
; Function Attrs: cold noinline noreturn nounwind
declare dso_local void @_ZN4core9panicking9panic_fmt17h751be80779d42b53E(ptr, ptr align 4) unnamed_addr #3

; Function Attrs: argmemonly nocallback nofree nounwind willreturn
declare void @llvm.memcpy.p0.p0.i32(ptr noalias nocapture writeonly, ptr noalias nocapture readonly, i32, i1 immarg) #4

; Function Attrs: nocallback nofree nosync nounwind readnone willreturn
declare i1 @llvm.expect.i1(i1, i1) #5

; core::panicking::panic
; Function Attrs: cold noinline noreturn nounwind
declare dso_local void @_ZN4core9panicking5panic17h8af046397a2bf65dE(ptr align 1, i32, ptr align 4) unnamed_addr #3

; Function Attrs: inaccessiblememonly nocallback nofree nosync nounwind willreturn
declare void @llvm.assume(i1 noundef) #6

; alloc::fmt::format::format_inner
; Function Attrs: nounwind
declare dso_local void @_ZN5alloc3fmt6format12format_inner17ha89d7ca2cd9cfeafE(ptr sret(%"alloc::string::String"), ptr) unnamed_addr #1

; Function Attrs: nounwind allockind("alloc,zeroed,aligned") allocsize(0)
declare dso_local noalias ptr @__rust_alloc_zeroed(i32, i32 allocalign) unnamed_addr #7

; Function Attrs: nounwind allockind("alloc,uninitialized,aligned") allocsize(0)
declare dso_local noalias ptr @__rust_alloc(i32, i32 allocalign) unnamed_addr #8

; alloc::raw_vec::capacity_overflow
; Function Attrs: noreturn nounwind
declare dso_local void @_ZN5alloc7raw_vec17capacity_overflow17h4b275cb3c10b0a78E() unnamed_addr #9

; alloc::alloc::handle_alloc_error
; Function Attrs: cold noreturn nounwind
declare dso_local void @_ZN5alloc5alloc18handle_alloc_error17h7458deb484270144E(i32, i32) unnamed_addr #10

; Function Attrs: nounwind allockind("free")
declare dso_local void @__rust_dealloc(ptr allocptr, i32, i32) unnamed_addr #11

attributes #0 = { inlinehint nounwind "target-cpu"="generic" }
attributes #1 = { nounwind "target-cpu"="generic" }
attributes #2 = { inlinehint noreturn nounwind "target-cpu"="generic" }
attributes #3 = { cold noinline noreturn nounwind "target-cpu"="generic" }
attributes #4 = { argmemonly nocallback nofree nounwind willreturn }
attributes #5 = { nocallback nofree nosync nounwind readnone willreturn }
attributes #6 = { inaccessiblememonly nocallback nofree nosync nounwind willreturn }
attributes #7 = { nounwind allockind("alloc,zeroed,aligned") allocsize(0) "alloc-family"="__rust_alloc" "target-cpu"="generic" }
attributes #8 = { nounwind allockind("alloc,uninitialized,aligned") allocsize(0) "alloc-family"="__rust_alloc" "target-cpu"="generic" }
attributes #9 = { noreturn nounwind "target-cpu"="generic" }
attributes #10 = { cold noreturn nounwind "target-cpu"="generic" }
attributes #11 = { nounwind allockind("free") "alloc-family"="__rust_alloc" "target-cpu"="generic" }
attributes #12 = { nounwind }
attributes #13 = { noreturn nounwind }

!0 = !{}
!1 = !{i32 0, i32 -2147483647}
!2 = !{i64 1}
!3 = !{i64 4}
!4 = !{i8 0, i8 2}
!5 = !{i8 0, i8 3}
!6 = !{i32 1, i32 -2147483647}
!7 = !{i32 0, i32 -2147483646}
