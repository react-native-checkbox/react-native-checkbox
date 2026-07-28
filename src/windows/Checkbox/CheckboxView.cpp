// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

#include "pch.h"
#include "CheckboxView.h"
#include <limits>

namespace winrt::Checkbox::implementation {

    void RegisterCheckboxComponentView(
        winrt::Microsoft::ReactNative::IReactPackageBuilder const& packageBuilder) noexcept {
        CheckboxCodegen::RegisterRNCCheckboxNativeComponent<winrt::Checkbox::implementation::RNCCheckboxComponentView>(
            packageBuilder,
            [](const winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder& builder) {
                builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().XamlSupport(true);
                // Use SetContentIslandComponentViewInitializer
                builder.SetContentIslandComponentViewInitializer(
                    [](const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView& islandView) noexcept {
                        auto userData = winrt::make_self<winrt::Checkbox::implementation::RNCCheckboxComponentView>();
                        userData->InitializeContentIsland(islandView);
                        islandView.UserData(*userData);
                    });
                // Set up initial state with zero size
                builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetInitialStateDataFactory(
                    [](const winrt::Microsoft::ReactNative::IComponentProps& /*props*/) noexcept {
                        return winrt::make<RNCCheckboxStateData>(winrt::Windows::Foundation::Size{ 0, 0 });
                    });

                // Register the measure function - reads from state
                builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetMeasureContentHandler(
                    [](winrt::Microsoft::ReactNative::ShadowNode const& shadowNode,
                        winrt::Microsoft::ReactNative::LayoutContext const&,
                        winrt::Microsoft::ReactNative::LayoutConstraints const&) noexcept {

                            auto currentState = winrt::get_self<RNCCheckboxStateData>(shadowNode.StateData());

                            if (currentState && currentState->desiredSize.Width > 0) {
                                // Return the measured size from state
                                return currentState->desiredSize;
                            }

                            // Return a default size if we don't have a measurement yet
                            return winrt::Windows::Foundation::Size{ 32, 32 };
                    });

                // Handle state updates
                builder.as<winrt::Microsoft::ReactNative::IReactViewComponentBuilder>().SetUpdateStateHandler(
                    [](const winrt::Microsoft::ReactNative::ComponentView& view,
                        const winrt::Microsoft::ReactNative::IComponentState& newState) {
                            auto islandView = view.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
                            auto userData = islandView.UserData().as<winrt::Checkbox::implementation::RNCCheckboxComponentView>();
                            userData->UpdateState(view, newState);
                    });
            });
    }

    void RNCCheckboxComponentView::InitializeContentIsland(
        const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView& islandView) {
        // Create CheckBox
        m_checkBox = winrt::Microsoft::UI::Xaml::Controls::CheckBox();
        m_checkBox.HorizontalAlignment(winrt::Microsoft::UI::Xaml::HorizontalAlignment::Left);
        m_checkBox.VerticalAlignment(winrt::Microsoft::UI::Xaml::VerticalAlignment::Center);

        // Subscribe to Checked/Unchecked events with auto-revokers
        m_checkedRevoker = m_checkBox.Checked(winrt::auto_revoke, [this](auto const&, auto const&) {
            OnCheckedChanged();
        });
        
        m_uncheckedRevoker = m_checkBox.Unchecked(winrt::auto_revoke, [this](auto const&, auto const&) {
            OnCheckedChanged();
        });

        // Listen for size changes on the checkbox with auto-revoker
        m_sizeChangedRevoker = m_checkBox.SizeChanged(winrt::auto_revoke, [this](auto const&, auto const&) {
            RefreshSize();
        });

        m_island = winrt::Microsoft::UI::Xaml::XamlIsland{};
        m_island.Content(m_checkBox);
        islandView.Connect(m_island.ContentIsland());
        m_islandView = winrt::make_weak(islandView);
    }

    void RNCCheckboxComponentView::UpdateProps(
        const winrt::Microsoft::ReactNative::ComponentView& view,
        const winrt::com_ptr<CheckboxCodegen::RNCCheckboxProps>& newProps,
        const winrt::com_ptr<CheckboxCodegen::RNCCheckboxProps>& oldProps) noexcept {
        BaseRNCCheckbox::UpdateProps(view, newProps, oldProps);

        if (!m_checkBox) {
            return;
        }

        // Update value (checked state)
        if (newProps->value.has_value()) {
            m_checkBox.IsChecked(newProps->value.value());
        }

        // Update disabled state
        if (newProps->disabled.has_value()) {
            m_checkBox.IsEnabled(!newProps->disabled.value());
        }

        auto resDict = m_checkBox.Resources();
        auto theme = view.as<winrt::Microsoft::ReactNative::Composition::ComponentView>().Theme();

        // onCheckColor - color of the check mark when checked
        if (newProps->onCheckColor) {
            auto brush = winrt::Microsoft::UI::Xaml::Media::SolidColorBrush(newProps->onCheckColor.AsWindowsColor(theme));
            resDict.Insert(winrt::box_value(L"CheckBoxCheckGlyphForegroundChecked"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckGlyphForegroundCheckedPointerOver"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckGlyphForegroundCheckedPressed"), brush);
        }

        // onTintColor - color of the border when checked
        if (newProps->onTintColor) {
            auto brush = winrt::Microsoft::UI::Xaml::Media::SolidColorBrush(newProps->onTintColor.AsWindowsColor(theme));
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundStrokeChecked"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundStrokeCheckedPointerOver"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundStrokeCheckedPressed"), brush);
        }

        // onFillColor - fill color of the box when checked
        if (newProps->onFillColor) {
            auto brush = winrt::Microsoft::UI::Xaml::Media::SolidColorBrush(newProps->onFillColor.AsWindowsColor(theme));
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillChecked"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillCheckedPointerOver"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillCheckedPressed"), brush);
        }

        // tintColor - color of the box when unchecked
        if (newProps->tintColor) {
            auto brush = winrt::Microsoft::UI::Xaml::Media::SolidColorBrush(newProps->tintColor.AsWindowsColor(theme));
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillUnchecked"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillUncheckedPointerOver"), brush);
            resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillUncheckedPressed"), brush);
        }

        // label - text content next to the checkbox
        if (!newProps->label.empty()) {
            m_checkBox.Content(winrt::box_value(winrt::to_hstring(newProps->label)));
        } else {
            m_checkBox.Content(nullptr);
        }

        RefreshSize();
    }

    // Measure checkbox and update state if needed.
    void RNCCheckboxComponentView::RefreshSize() {
        if (!m_checkBox) {
            return;
        }

        m_checkBox.Measure(winrt::Windows::Foundation::Size{
            std::numeric_limits<float>::infinity(),
            std::numeric_limits<float>::infinity()
        });

        auto desiredSize = m_checkBox.DesiredSize();

        if (m_state) {
            auto currentState = winrt::get_self<RNCCheckboxStateData>(m_state.Data());
            if (desiredSize != currentState->desiredSize) {
                m_state.UpdateStateWithMutation([desiredSize](winrt::Windows::Foundation::IInspectable /*data*/) {
                    return winrt::make<RNCCheckboxStateData>(desiredSize);
                });
            }
        }
    }

    void RNCCheckboxComponentView::UpdateState(
        const winrt::Microsoft::ReactNative::ComponentView& /*view*/,
        const winrt::Microsoft::ReactNative::IComponentState& newState) noexcept {
        m_state = newState;
    }

    void RNCCheckboxComponentView::OnCheckedChanged() {
        if (auto eventEmitter = EventEmitter()) {
            CheckboxCodegen::RNCCheckboxEventEmitter::OnChange args;
            args.value = m_checkBox.IsChecked().GetBoolean();
            eventEmitter->onChange(args);
        }
    }

} // namespace winrt::Checkbox::implementation