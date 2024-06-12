import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Slider from '@react-native-community/slider';
import { useUserProfile } from './../../../../context/UserContext'
import { Colors } from './../../../../constants/Colors';

export default function ProfileForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    employee_number: '',
    profession: '',
    years_of_exp: 0,
    address: {
      city: '',
      country: '',
      pincode: ''
    },
    phone_number: '',
    email: '',
    linkedin: '',
    portfolio: '',
    summary: ''
  });

  const { userProfile } = useUserProfile()

  useEffect(() => {
    if (userProfile) {
      const personal_details = userProfile?.personal_details
      const full_address = personal_details.address ? personal_details.address.split(',') : []
      setFormValues(userProfile.personal_details)
      setFormValues({
        ...personal_details, address: {
          city: full_address[0],
          country: full_address[1],
          pincode: full_address[2]
        },
      })
    }
  }, [userProfile])

  const handleFormSubmit = () => {
    console.log('Form submitted:', formValues);
    // Implement form submission logic here
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{
        padding: 16, backgroundColor: '#ffffff'
      }}>
        <View >
          <Text style={{ fontFamily: 'spartan-bold', color: '#333', fontSize: 24, marginBottom: 12 }}>Personal Information</Text>
          <Text style={{ fontFamily: 'spartan-medium', color: '#666', fontSize: 16, marginBottom: 24 }}>Let's get to know you a little better.</Text>
        </View>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 15,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#ccc',

        }}>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={{ fontFamily: 'spartan-regular', backgroundColor: '#fff', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Full Name'
              value={formValues.name}
              returnKeyType='next'
              onChangeText={text => setFormValues({ ...formValues, name: text })}
            />
            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Employee Number'
              value={formValues.employee_number}
              onChangeText={text => setFormValues({ ...formValues, employee_number: text })}
            />
            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Profession'
              value={formValues.profession}
              onChangeText={text => setFormValues({ ...formValues, profession: text })}
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                step={.25}
                maximumValue={30}
                // minimumTrackTintColor="#FFFFFF"
                // maximumTrackTintColor="#000000"
                value={formValues.years_of_exp}
                onValueChange={value => setFormValues({ ...formValues, years_of_exp: value })}
              />
              <Text style={{ fontFamily: 'spartan-regular', marginLeft: 10 }}>{formValues.years_of_exp}</Text>
            </View>

            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='City'
              value={formValues.address.city}
              onChangeText={text => setFormValues({ ...formValues, address: { ...formValues.address, city: text } })}
            />
            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Country'
              value={formValues.address.country}
              onChangeText={text => setFormValues({ ...formValues, address: { ...formValues.address, country: text } })}
            />
            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Pincode'
              value={formValues.address.pincode}
              onChangeText={text => setFormValues({ ...formValues, address: { ...formValues.address, pincode: text } })}
            />
            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Mobile Number'
              value={formValues.phone_number}
              onChangeText={text => setFormValues({ ...formValues, phone_number: text })}
            />
            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Email'
              value={formValues.email}
              onChangeText={text => setFormValues({ ...formValues, email: text })}
              editable={false} // Disabled input in React Native
            />

            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Linkedin Profile link'
              value={formValues.linkedin}
              onChangeText={text => setFormValues({ ...formValues, linkedin: text })}
            />
            <TextInput
              style={{ fontFamily: 'spartan-regular', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10 }}
              placeholder='Personal portfolio'
              value={formValues.portfolio}
              onChangeText={text => setFormValues({ ...formValues, portfolio: text })}
            />

            <TextInput
              multiline
              style={{ fontFamily: 'spartan-regular', lineHeight: 21, height: 120, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10, paddingTop: 10 }}
              placeholder='Professional Summary (min length 150, max length 500)'
              value={formValues.summary}
              onChangeText={text => setFormValues({ ...formValues, summary: text })}
            />
          </View>

          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderWidth: 1, borderRadius: 140, marginVertical: 6, backgroundColor: Colors.PRIMARY, alignSelf: 'center'
            }}
            onPress={handleFormSubmit}
          >
            <Text style={{ color: '#fff' }}>Save and Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
