// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

#pragma once

#include "pch.h"

#include "codegen_manual/react/components/RNCCheckboxSpec/RNCCheckbox.g.h"

#include <winrt/Microsoft.ReactNative.h>
#include <winrt/Microsoft.ReactNative.Composition.h>
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#include <winrt/Microsoft.UI.Xaml.h>

namespace winrt::Checkbox::implementation {

// State to store the measured size
struct RNCCheckboxStateData : winrt::implements<RNCCheckboxStateData, winrt::IInspectable> {
    RNCCheckboxStateData(winrt::Windows::Foundation::Size ds) : desiredSize(ds) {}
    winrt::Windows::Foundation::Size desiredSize;
};

struct RNCCheckboxComponentView : winrt::implements<RNCCheckboxComponentView, winrt::IInspectable>,
    CheckboxCodegen::BaseRNCCheckbox<RNCCheckboxComponentView> {
    void InitializeContentIsland(
        const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView& islandView);

    void UpdateProps(
        const winrt::Microsoft::ReactNative::ComponentView& view,
        const winrt::com_ptr<CheckboxCodegen::RNCCheckboxProps>& newProps,
        const winrt::com_ptr<CheckboxCodegen::RNCCheckboxProps>& oldProps) noexcept override;

    void UpdateState(
        const winrt::Microsoft::ReactNative::ComponentView& view,
        const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept override;

private:
    void RefreshSize();
    void OnCheckedChanged();

    winrt::weak_ref<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView> m_islandView;
    winrt::Microsoft::UI::Xaml::XamlIsland m_island{ nullptr };
    winrt::Microsoft::UI::Xaml::Controls::CheckBox m_checkBox{ nullptr };
    winrt::Microsoft::ReactNative::IComponentState m_state{ nullptr };

    // Auto-revokers for event subscriptions
    winrt::Microsoft::UI::Xaml::Controls::CheckBox::Checked_revoker m_checkedRevoker;
    winrt::Microsoft::UI::Xaml::Controls::CheckBox::Unchecked_revoker m_uncheckedRevoker;
    winrt::Microsoft::UI::Xaml::FrameworkElement::SizeChanged_revoker m_sizeChangedRevoker;
};

void RegisterCheckboxComponentView(
    winrt::Microsoft::ReactNative::IReactPackageBuilder const& packageBuilder) noexcept;

} // namespace winrt::Checkbox::implementation




