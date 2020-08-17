// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "ReactPackageProvider.h"
#include "ReactPackageProvider.g.cpp"

#include "CheckboxViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::CheckboxWindows::implementation {

  void ReactPackageProvider::CreatePackage(IReactPackageBuilder const& packageBuilder) noexcept {
      packageBuilder.AddViewManager(L"CheckboxViewManager", []() { return winrt::make<CheckboxViewManager>(); });
  }

}