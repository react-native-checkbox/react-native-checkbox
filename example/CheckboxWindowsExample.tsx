import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
// Use relative import for workspace linking
import {
  RNCCheckbox,
  type RNCCheckboxNativeProps,
} from '../src/js';

// Reusable Card component for examples
function ExampleCard({children}: {children: React.ReactNode}) {
  return <View style={styles.card}>{children}</View>;
}

// Example 1: Basic Checkbox
function BasicCheckboxExample() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: {nativeEvent: {value: boolean}}) => {
    setChecked(event.nativeEvent.value);
  };

  return (
    <ExampleCard>
      <Text style={styles.description}>Basic checkbox with state</Text>
      <RNCCheckbox
        value={checked}
        onChange={handleChange}
        label={checked ? 'Checked ✓' : 'Unchecked'}
      />
    </ExampleCard>
  );
}

// Example 2: Disabled Checkbox
function DisabledCheckboxExample() {
  return (
    <ExampleCard>
      <Text style={styles.description}>
        Disabled checkboxes - user cannot interact
      </Text>
      <RNCCheckbox
        value={true}
        disabled={true}
        label="Checked & Disabled"
      />
      <RNCCheckbox
        value={false}
        disabled={true}
        label="Unchecked & Disabled"
      />
    </ExampleCard>
  );
}

// Example 3: Multiple Checkboxes
function MultipleCheckboxExample() {
  const [options, setOptions] = React.useState({
    option1: false,
    option2: true,
    option3: false,
  });

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <ExampleCard>
      <Text style={styles.description}>Multiple checkboxes in a form</Text>
      <RNCCheckbox
        value={options.option1}
        onChange={() => toggleOption('option1')}
        label="Option 1"
      />
      <RNCCheckbox
        value={options.option2}
        onChange={() => toggleOption('option2')}
        label="Option 2"
      />
      <RNCCheckbox
        value={options.option3}
        onChange={() => toggleOption('option3')}
        label="Option 3"
      />
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Selected:</Text>
        <Text style={styles.resultValue}>
          {Object.entries(options)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(', ') || 'None'}
        </Text>
      </View>
    </ExampleCard>
  );
}

// Example 4: Controlled Toggle
function ControlledToggleExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <ExampleCard>
      <Text style={styles.description}>
        Controlled checkbox with external toggle button
      </Text>
      <RNCCheckbox
        value={checked}
        onChange={(e: {nativeEvent: {value: boolean}}) => setChecked(e.nativeEvent.value)}
        label={`Value: ${checked ? 'true' : 'false'}`}
      />
      <View style={styles.buttonRow}>
        <Button
          title="Toggle"
          onPress={() => setChecked(prev => !prev)}
        />
        <View style={{width: 10}} />
        <Button
          title="Set True"
          onPress={() => setChecked(true)}
        />
        <View style={{width: 10}} />
        <Button
          title="Set False"
          onPress={() => setChecked(false)}
        />
      </View>
    </ExampleCard>
  );
}

// Example 5: Custom Colors
function CustomColorsExample() {
  const [checked, setChecked] = React.useState(true);

  return (
    <ExampleCard>
      <Text style={styles.description}>
        Checkbox with custom colors (tintColor, onCheckColor, onFillColor, onTintColor)
      </Text>
      <RNCCheckbox
        value={checked}
        onChange={(e: {nativeEvent: {value: boolean}}) => setChecked(e.nativeEvent.value)}
        tintColor="#888888"
        onCheckColor="#ffffff"
        onFillColor="#0078d4"
        onTintColor="#005a9e"
        label="Blue theme"
      />
      <RNCCheckbox
        value={checked}
        onChange={(e: {nativeEvent: {value: boolean}}) => setChecked(e.nativeEvent.value)}
        tintColor="#cccccc"
        onCheckColor="#ffffff"
        onFillColor="#107c10"
        onTintColor="#0b5c0b"
        label="Green theme"
      />
      <RNCCheckbox
        value={checked}
        onChange={(e: {nativeEvent: {value: boolean}}) => setChecked(e.nativeEvent.value)}
        tintColor="#e0e0e0"
        onCheckColor="#000000"
        onFillColor="#ffb900"
        onTintColor="#d39e00"
        label="Yellow theme"
      />
      <View style={styles.buttonRow}>
        <Button title="Toggle All" onPress={() => setChecked(prev => !prev)} />
      </View>
    </ExampleCard>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 2,
    marginTop: 8,
  },
  resultLabel: {
    fontSize: 13,
    color: '#666',
    marginRight: 8,
  },
  resultValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0078d4',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
  },
});

export const examples = [
  {
    title: 'Basic Checkbox',
    render: BasicCheckboxExample,
  },
  {
    title: 'Disabled Checkboxes',
    render: DisabledCheckboxExample,
  },
  {
    title: 'Multiple Checkboxes',
    render: MultipleCheckboxExample,
  },
  {
    title: 'Controlled Toggle',
    render: ControlledToggleExample,
  },
  {
    title: 'Custom Colors',
    render: CustomColorsExample,
  },
];
