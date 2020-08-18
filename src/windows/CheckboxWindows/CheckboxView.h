// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once

#include "CheckboxView.g.h"
#include "winrt/Microsoft.ReactNative.h"
#include "NativeModules.h"

namespace winrt::CheckboxWindows::implementation {
    
    namespace xaml = winrt::Windows::UI::Xaml;
    
    class CheckboxView : public CheckboxViewT<CheckboxView> {
    public:
        CheckboxView(Microsoft::ReactNative::IReactContext const& reactContext);
        void UpdateProperties(Microsoft::ReactNative::IJSValueReader const& reader);

    private:
        Microsoft::ReactNative::IReactContext m_reactContext{ nullptr };
        bool m_updating{ false };

        xaml::Controls::CheckBox::Checked_revoker m_checkBoxCheckedRevoker{};
        xaml::Controls::CheckBox::Unchecked_revoker m_checkBoxUncheckedRevoker{};

        void RegisterEvents();
        void OnCheckedHandler(winrt::Windows::Foundation::IInspectable const& /*sender*/, xaml::RoutedEventArgs const& args, bool isChecked);
    };
}

namespace winrt::CheckboxWindows::factory_implementation {
    struct CheckboxView : CheckboxViewT<CheckboxView, implementation::CheckboxView> {};
}