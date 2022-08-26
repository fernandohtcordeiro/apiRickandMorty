import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import React, { 
  useEffect, 
  useState,
} from 'react';

import Api from '../services/Api';

import { ICharacter } from '../types';

function RMCharacter() {

  const [ character, setCharacter ] = useState<ICharacter[]>();
  const [ showModal, setShowModal ] = useState(false)
  const [ characterDetails, setCharacterDetails ] = useState<ICharacter>()
  
  useEffect(() => {
    Api.get('character').then(
      res => {
        setCharacter(res.data.results)
      }
    )
  }, []);

  const getDataCharacter = (id: Number) => {
    const value: ICharacter[] | any = character?.filter( item => item.id === id )
    
    let parsed: any = {}

    value.forEach(function (item: any) {
      for (var i in item) {
        parsed[i] = item[i];
      }
    });
    setCharacterDetails(parsed)
  }

  return(
    <SafeAreaView
      style={{ backgroundColor: '#7B25F0' }}
    >
      <ScrollView>
        <View
          style={styles.container}
        >
          { character?.map(
            (item, index) => (
              <View 
                style={styles.card}
                key={index}
              >
                <Modal
                  animationType='slide'
                  visible={showModal}
                  onRequestClose={
                    () => setShowModal(!showModal)
                  }
                >
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#7B25F0'
                  }}>

                <Pressable
                      onPress={ () => setShowModal(!showModal) }

                      style={{
                        backgroundColor:'#a498ed',
                        padding:8,
                        borderRadius:5,
                        maxWidth:'80%',
                        alignItems:'center',
                        marginBottom:8,
                        position:'relative',
                        left: 80
                        
                      }}
                    >

                      <Text style={{color:'#000', }} >X</Text>
                    </Pressable>
                  <Image
                    style={{ height: 180, width: 180, borderRadius: 60 }}
                    source={{ uri: characterDetails?.image }}
                  />
              
                    <Text style={{
                      color:'#fff', 
                      fontSize: 25,
                      fontWeight: "bold"
                      
                      }}>
                      {characterDetails?.name}
                    </Text>

                    <Text style={{
                      color:'#fff', 
                      fontSize: 25,
                      fontWeight: "bold"
                      
                      }}>
                      {characterDetails?.species}
                    </Text>
                   

                  </View>
                </Modal>
                <Image 
                  style={{ width: 100, height: 100, borderRadius:10 }}
                  source={{ uri: item.image }}
                />
                <View
                  style={styles.textBox }
                  
                >
                  <Text
                    style={styles.textName}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={styles.text}
                  > Especie:
                    { item.species}
                  </Text>
                  <Text
                    style={styles.text}
                  > Sexo:
                    { item.gender}
                  </Text>
                  <Pressable
                    onPress={ () => {
                      getDataCharacter(item.id)
                      setShowModal(!showModal)
                    } }
                    style={{
                      backgroundColor:'#7B25F0',
                      padding:3,
                      borderRadius:5,
                      maxWidth:'50%',
                      alignItems:'center',
                      marginTop:5
                    }}
                  >
                    <Text style={{color:'#fff', }}> Saiba mais </Text>
                  </Pressable>
                </View>
              </View>
            )
          ) }
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262a31',
    marginTop:20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1ba1b4',
    width: Dimensions.get('window').width - 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    margin: 12
  },
  textBox: {
    flex: 1,
    paddingHorizontal: 20
  },
  textName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff'
  },
})

export default RMCharacter