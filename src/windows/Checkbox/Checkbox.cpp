// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "Checkbox.h"

using namespace winrt;
using namespace winrt::Microsoft::ReactNative;

namespace winrt::Checkbox::implementation {

void CheckboxModule::Initialize(ReactContext const &reactContext) noexcept {
  m_reactContext = reactContext;
}

void RegisterCheckboxNativeModule(IReactPackageBuilder const &packageBuilder) noexcept {
  AddAttributedModules(packageBuilder, true);
}

} // namespace winrt::Checkbox::implementation
