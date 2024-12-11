import { ScrollView, View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { images } from '../../constants'
import FromField from '../../components/FromField'

import CustomButton from '../../components/CustomButton'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password:''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit =() => {

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          
          <Text className="text-2xl text-white text-semibold mt-10 font-semibold">
          Log in to Aora
          </Text>

          <FromField
            title="Email"
            value={form.email}
            handleChangeText = {(e) => setForm ({...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FromField
            title="Password"
            value={form.password}
            handleChangeText = {(e) => setForm ({...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton 
             title= "Sign In"
             handlePress={submit}
             container='mt-7'
             isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn