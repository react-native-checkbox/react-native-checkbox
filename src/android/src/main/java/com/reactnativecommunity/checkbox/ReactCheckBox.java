/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
package com.reactnativecommunity.checkbox;

import android.content.Context;

import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatCheckBox;

/** CheckBox that has its value controlled by JS. */
/*package*/ class ReactCheckBox extends AppCompatCheckBox {

  private OnCheckedChangeListener mOnCheckedChangeListener = null;

  public ReactCheckBox(Context context) {
    super(context);
  }

  @Override
  public void setChecked(boolean checked) {
    // Log.d("checkbox", "checked: " + checked + " mAllowChange: " + mAllowChange);
    if (mOnCheckedChangeListener != null) {
      mOnCheckedChangeListener.onCheckedChanged(this, checked);
    }
  }

  @Override
  public void setOnCheckedChangeListener(@Nullable OnCheckedChangeListener listener) {
    super.setOnCheckedChangeListener(listener);
    mOnCheckedChangeListener = listener;
  }

  /*package*/ void setOn(boolean on) {
    // If the checkbox has a different value than the value sent by JS, we must change it.
    // Log.d("checkbox", "on: " + on + " mAllowChange: " + mAllowChange);
    if (isChecked() == on) return;
    super.setChecked(on);
  }
}
