import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconEdit } from '@components/icons';
import { displayToDate, dateToDisplay } from '@features/auth/utils/dateUtils';

export interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function DateInput({ label, value, onChange, error }: DateInputProps): React.JSX.Element {
  const [show, setShow] = useState(false);
  const currentDate = value ? displayToDate(value) : new Date(1990, 0, 1);

  return (
    <View className="w-full">
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShow(true)}>
        <View className="flex-row items-center gap-2 pb-2 border-b border-blue">
          <View className="flex-1 gap-2">
            <Text className="font-roobert-semibold text-base text-ink">{label}</Text>
            <Text className="font-roobert text-sm text-ink" style={{ opacity: value ? 0.6 : 0.4 }}>
              {value || 'DD/MM/YYYY'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShow(true)}
            activeOpacity={0.6}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <IconEdit size={24} color="#111827" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {error ? <Text className="font-roobert text-xs text-red-600 mt-1">{error}</Text> : null}

      {show && Platform.OS === 'android' && (
        <DateTimePicker
          mode="date"
          value={currentDate}
          display="default"
          maximumDate={new Date()}
          onChange={(_e, selected) => {
            setShow(false);
            if (selected) onChange(dateToDisplay(selected));
          }}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={show}
          transparent
          animationType="slide"
          onRequestClose={() => setShow(false)}
        >
          {/* Overlay */}
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }}
            activeOpacity={1}
            onPress={() => setShow(false)}
          />

          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 12,
              paddingBottom: 40,
            }}
          >
            <DateTimePicker
              mode="date"
              value={currentDate}
              display="spinner"
              themeVariant="light"
              maximumDate={new Date()}
              style={{ height: 216, width: '100%', marginHorizontal: 'auto' }}
              onChange={(_e, selected) => {
                if (selected) onChange(dateToDisplay(selected));
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}
