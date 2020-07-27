// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"
#include "CheckboxViewManager.h"
#include "NativeModules.h"
#include "CheckboxView.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation::Collections;

    namespace xaml = winrt::Windows::UI::Xaml;
}

namespace winrt::CheckboxWindows::implementation {

    CheckboxViewManager::CheckboxViewManager() {}

    // IViewManager
    winrt::hstring CheckboxViewManager::Name() noexcept {
        return L"RNCCheckboxWindows";
    }

    xaml::FrameworkElement CheckboxViewManager::CreateView() noexcept {
        return winrt::CheckboxWindows::CheckboxView(m_reactContext);
    }

    // IViewManagerWithReactContext
    winrt::IReactContext CheckboxViewManager::ReactContext() noexcept {
        return m_reactContext;
    }

    void CheckboxViewManager::ReactContext(IReactContext reactContext) noexcept {
        m_reactContext = reactContext;
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> CheckboxViewManager::NativeProps() noexcept {
        auto nativeProps = winrt::single_threaded_map<hstring, ViewManagerPropertyType>();

        nativeProps.Insert(L"disabled", ViewManagerPropertyType::Boolean);
        nativeProps.Insert(L"value", ViewManagerPropertyType::Boolean);

        nativeProps.Insert(L"onCheckColor", ViewManagerPropertyType::Color);
        nativeProps.Insert(L"onTintColor", ViewManagerPropertyType::Color);
        nativeProps.Insert(L"onFillColor", ViewManagerPropertyType::Color);
        nativeProps.Insert(L"tintColor", ViewManagerPropertyType::Color);

        return nativeProps.GetView();
    }

    void CheckboxViewManager::UpdateProperties(xaml::FrameworkElement const& view,
        IJSValueReader const& propertyMapReader) noexcept {
        if (auto checkboxView = view.try_as<CheckboxView>()) {
            checkboxView->UpdateProperties(propertyMapReader);
        } else {
            OutputDebugStringW(L"Type deduction for CheckboxView failed.");
        }
    }

    // IViewManagerWithExportedEventTypeConstants
    ConstantProviderDelegate CheckboxViewManager::ExportedCustomBubblingEventTypeConstants() noexcept {
        return nullptr;
    }

    ConstantProviderDelegate CheckboxViewManager::ExportedCustomDirectEventTypeConstants() noexcept {
        return [](winrt::IJSValueWriter const& constantWriter) {
            WriteCustomDirectEventTypeConstant(constantWriter, "onChange");
        };
    }

}
