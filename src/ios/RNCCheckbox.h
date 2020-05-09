//
//  RNCCheckbox.h
//  RNCCheckbox
//
//  Created by nicholaslee on 2020/05/09.
//  Copyright © 2020 Facebook. All rights reserved.
//
#import "BEMCheckBox.h"
#import <React/RCTComponent.h>

@interface RNCCheckbox: BEMCheckBox

@property (nonatomic, copy) RCTBubblingEventBlock onAnimationDidStop;
@property (nonatomic, copy) RCTBubblingEventBlock onValueChange;

@end
