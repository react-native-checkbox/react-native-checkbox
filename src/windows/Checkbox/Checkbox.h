// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once

#include "pch.h"
#include <NativeModules.h>
#include "codegen/NativeCheckboxModuleSpec.g.h"

namespace winrt::Checkbox::implementation {

REACT_MODULE(CheckboxModule, L"Checkbox")
struct CheckboxModule {
  using ModuleSpec = CheckboxCodegen::CheckboxModuleSpec;

  REACT_INIT(Initialize)
  void Initialize(winrt::Microsoft::ReactNative::ReactContext const &reactContext) noexcept;

 private:
  winrt::Microsoft::ReactNative::ReactContext m_reactContext{nullptr};
};

void RegisterCheckboxNativeModule(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept;

} // namespace winrt::Checkbox::implementation
