// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"

#include "JSValueXaml.h"

#include "CheckboxView.h"
#include "CheckboxView.g.cpp"

#include "winrt/Windows.UI.Xaml.Media.h"
#include "winrt/Windows.UI.Xaml.Media.Imaging.h"
#include "winrt/Windows.UI.Xaml.Input.h"

namespace winrt {
    using namespace Microsoft::ReactNative;
    using namespace Windows::Foundation;
    using namespace Windows::UI;
    using namespace Windows::UI::Xaml::Media;
}

namespace winrt::CheckboxWindows::implementation {

    CheckboxView::CheckboxView(winrt::IReactContext const& reactContext) : m_reactContext(reactContext) {
        RegisterEvents();
    }

    void CheckboxView::RegisterEvents() {

        m_checkBoxCheckedRevoker = this->Checked(winrt::auto_revoke,
            [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get()) {
                self->OnCheckedHandler(sender, args, true);
            }
        });

         m_checkBoxUncheckedRevoker = this->Unchecked(winrt::auto_revoke,
            [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get()) {
                self->OnCheckedHandler(sender, args, false);
            }
        });
    }

    void CheckboxView::UpdateProperties(winrt::IJSValueReader const& reader) {
        m_updating = true;
        auto const& propertyMap = JSValueObject::ReadFrom(reader);

        for (auto const& pair : propertyMap) {
            auto const& propertyName = pair.first;
            auto const& propertyValue = pair.second;

            if (propertyName == "value") {
                if (propertyValue.IsNull()) {
                    this->ClearValue(xaml::Controls::Primitives::ToggleButton::IsCheckedProperty());
                } else {
                    this->IsChecked(propertyValue.AsBoolean());
                }
            } else if (propertyName == "onCheckColor") {
                if (!propertyValue.IsNull()) {
                    auto resDict = this->Resources();

                    resDict.Insert(winrt::box_value(L"CheckBoxCheckGlyphForegroundChecked"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckGlyphForegroundCheckedPointerOver"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckGlyphForegroundCheckedPressed"), propertyValue.To<winrt::Brush>());
                }
            } else if (propertyName == "onTintColor") {
                if (!propertyValue.IsNull()) {
                    auto resDict = this->Resources();

                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundStrokeChecked"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundStrokeCheckedPointerOver"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundStrokeCheckedPressed"), propertyValue.To<winrt::Brush>());
                }
            } else if (propertyName == "onFillColor") {
                if (!propertyValue.IsNull()) {
                    auto resDict = this->Resources();

                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillChecked"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillCheckedPointerOver"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillCheckedPressed"), propertyValue.To<winrt::Brush>());
                }
            } else if (propertyName == "tintColor") {
                if (!propertyValue.IsNull()) {
                    auto resDict = this->Resources();

                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillUnchecked"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillUncheckedPointerOver"), propertyValue.To<winrt::Brush>());
                    resDict.Insert(winrt::box_value(L"CheckBoxCheckBackgroundFillUncheckedPressed"), propertyValue.To<winrt::Brush>());
                }
            } else if (propertyName == "disabled") {
                if (!propertyValue.IsNull()) {
                    this->IsEnabled(!propertyValue.AsBoolean());
                }
            }
        }


        m_updating = false;
    }

    void CheckboxView::OnCheckedHandler(winrt::Windows::Foundation::IInspectable const& /*sender*/, xaml::RoutedEventArgs const& args, bool isChecked) {
        if (!m_updating) {
            m_reactContext.DispatchEvent(
                *this,
                L"topChange",
                [&](winrt::Microsoft::ReactNative::IJSValueWriter const& eventDataWriter) noexcept {
                    eventDataWriter.WriteObjectBegin();
                    {
                        WriteProperty(eventDataWriter, L"value", isChecked);
                    }
                    eventDataWriter.WriteObjectEnd();
                });
        }
    }
}
