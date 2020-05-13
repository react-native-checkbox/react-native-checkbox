//  Created by Nicholas Lee <nicholaslee@gmail.com> on 2020/05/07.
//  Copyright © 2020 Facebook. All rights reserved.

//  This source code is licensed under the MIT license found in the
//  LICENSE file in the root directory of this source tree.

#import "BEMCheckBox.h"
#import "RNCCheckboxManager.h"
#import "RNCCheckbox.h"

#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/UIView+React.h>
#import <React/RCTConvert.h>

@implementation RNCCheckboxManager

RCT_EXPORT_MODULE();

RCT_CUSTOM_VIEW_PROPERTY(value, BOOL, BEMCheckBox) {
    [view setOn:[RCTConvert BOOL:json] animated:YES];
}

RCT_EXPORT_VIEW_PROPERTY(lineWidth, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(hideBox, BOOL);
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(onCheckColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(onFillColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(onTintColor, UIColor);
RCT_EXPORT_VIEW_PROPERTY(animationDuration, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(onAnimationDidStop, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onValueChange, RCTBubblingEventBlock)

RCT_REMAP_VIEW_PROPERTY(boxType, boxType, BEMBoxType);
RCT_REMAP_VIEW_PROPERTY(onAnimationType, onAnimationType, BEMAnimationType);
RCT_REMAP_VIEW_PROPERTY(offAnimationType, offAnimationType, BEMAnimationType);

- (UIView *)view
{
    RNCCheckbox *checkbox = [RNCCheckbox new];
    checkbox.delegate = self;
    return checkbox;
}

- (void)didTapCheckBox:(RNCCheckbox *) checkbox {
    if (!checkbox.onValueChange) {
      return;
    }
    checkbox.onValueChange(@{
        @"target": checkbox.reactTag,
        @"value": @(checkbox.on),
        @"name": @"tap",
    });
}

- (void)animationDidStopForCheckBox:(RNCCheckbox *) checkbox {
    if (!checkbox.onAnimationDidStop) {
      return;
    }
    checkbox.onAnimationDidStop(@{
        @"target": checkbox.reactTag,
        @"value": @(checkbox.on),
        @"name": @"animation",
    });
}

@end

@implementation RCTConvert (BEMCheckBox)

RCT_ENUM_CONVERTER(BEMBoxType, (@{
    @"circle": @(BEMBoxTypeCircle),
    @"square": @(BEMBoxTypeSquare),
}), BEMBoxTypeCircle, integerValue);


RCT_ENUM_CONVERTER(BEMAnimationType, (@{
    @"stroke": @(BEMAnimationTypeStroke),
    @"fill": @(BEMAnimationTypeFill),
    @"bounce": @(BEMAnimationTypeBounce),
    @"flat": @(BEMAnimationTypeFlat),
    @"one-stroke": @(BEMAnimationTypeOneStroke),
    @"fade": @(BEMAnimationTypeFade),
}), BEMAnimationTypeStroke, integerValue);

@end
