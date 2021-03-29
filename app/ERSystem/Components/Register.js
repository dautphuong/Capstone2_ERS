/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import Ionicons from 'react-native-vector-icons/Ionicons'
 import {
     StyleSheet,
     View,
     Text,
     ImageBackground,
     Image,
     TextInput,
     Keyboard,
     TouchableOpacity,
     TouchableWithoutFeedback,
     Dimensions,
 } from 'react-native';
 import bgImage from '../image/logins.jpg';
 import logo from '../image/English_REVIEW.png';
 
 const {width: WIDTH} = Dimensions.get('window');
 
 export default class Register extends Component{
     constructor() {
         super()
         this.state = {
             showPass: true,
             press: false
         }
     }
     showPass = () =>{
         if(this.state.press == false){
             this.setState({showPass: false, press: true})
         }else{
             this.setState({showPass:true, press: false})
         }
     }
     render() {
         return (
             <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
             <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                 <View style={styles.containerLogo}>
                         <Image source = {logo} style={styles.logo}></Image>
                         <Text style={styles.textRegister}>Register</Text>
                 </View>
     
                 <View style={styles.inputContainer}>
                         <Ionicons name={'person-outline'} 
                         size = {28} 
                         color={'rgba(255,255,255,0.7)'} 
                         style={styles.inputIcon}/>
                         <TextInput 
                             style={styles.input}
                             placeholder={'UserName'}
                             placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                             underlineColorAndroid='transparent'
                             />
                 </View>
                 
                 <View style={styles.inputContainer}>
                         <Ionicons name={'lock-closed-outline'} 
                         size = {28} 
                         color={'rgba(255,255,255,0.7)'} 
                         style={styles.inputIcon}/>
                         <TextInput 
                             style={styles.input}
                             placeholder={'Password'}
                             secureTextEntry={this.state.showPass}
                             placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                             underlineColorAndroid='transparent'
                         />
 
                         <TouchableOpacity style={styles.btnEye}
                         onPress={this.showPass.bind(this)}>
                             <Ionicons name={ this.state.press == false ? 'eye-outline' :'eye-off-outline'} 
                             size= {26} 
                             color={'rgba(255,255,255,0.7)'} >
                             </Ionicons>
                         </TouchableOpacity>
                 </View>
                 
                 <View style={styles.inputContainer}>
                         <Ionicons name={'lock-closed-outline'} 
                         size = {28} 
                         color={'rgba(255,255,255,0.7)'} 
                         style={styles.inputIcon}/>
                         <TextInput 
                             style={styles.input}
                             placeholder={'Confirm- Password'}
                             secureTextEntry={this.state.showPass}
                             placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                             underlineColorAndroid='transparent'
                         />
                         <TouchableOpacity style={styles.btnEye}
                         onPress={this.showPass.bind(this)}>
                             <Ionicons name={ this.state.press == false ? 'eye-outline' :'eye-off-outline'} 
                             size= {26} 
                             color={'rgba(255,255,255,0.7)'} >
                             </Ionicons>
                         </TouchableOpacity>
                 </View>
     
                 <View style={styles.inputContainer}>
                         <Ionicons name={'logo-google'} 
                         size = {28} 
                         color={'rgba(255,255,255,0.7)'} 
                         style={styles.inputIcon}/>
                         <TextInput 
                             style={styles.input}
                             placeholder={'E-mail'}
                             keyboardType='email-address'
                             placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                             underlineColorAndroid='transparent'
                             />
                 </View>
                 <TouchableOpacity style={styles.btnRegister}>
                         <Text style={styles.Text}>Register</Text>
                     </TouchableOpacity>
             </ImageBackground>
             </TouchableWithoutFeedback>
         );
     }
     
 };
 
 const styles = StyleSheet.create({
     imageBackgroundContainer:{
         flex: 1,
         width: null,
         height: null,
         justifyContent: 'center',
         alignItems: 'center',
     },
     containerLogo:{
         bottom: 120,
         alignItems: 'center',
     },
     logo: {
         width: 230,
         height:230,
     },
     textRegister:{
         color: 'green',
         fontSize:25,
         fontWeight: '200',
         opacity:0.6
     },
     inputContainer:{
         marginTop:15,
     },
     input:{
         width: WIDTH -55,
         height: 55,
         bottom: 120,
         borderRadius:25,
         fontSize:16,
         paddingLeft:45,
         backgroundColor:'rgba(0,0,0,0.35)',
         color:'rgba(255,255,255,0.7)',
         marginHorizontal: 25,
     },
     inputIcon:{
         position:'absolute',
         bottom: 133,
         left:37
     },
     passIcon:{
         position:'absolute',
         bottom: 135,
         left:37
     },
     inputContainer:{
         marginTop:15,
     },
     btnEye:{
         position:'absolute',
         bottom: 133,
         right:37
     },
     btnRegister:{
         width: WIDTH -55,
         height: 45,
         borderRadius:25,
         backgroundColor:'#3399CC',
         justifyContent:'center',
         bottom: 90
     },
     Text:{
         textAlign: 'center',
         fontSize: 20,
         color: '#F8F8FF'
     },
})
 
 