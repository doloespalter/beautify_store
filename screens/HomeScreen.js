import * as React from "react";
import { createStackNavigator  } from 'react-navigation';
import MenuButton from '../components/MenuButton';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import DividerView from '../components/DividerView';
import colors from '../constants/Colors';
import CenterView from '../components/CenterView';
import PromoView from '../components/PromoView';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class HomeScreen extends React.Component {

  goToStoresView = serviceType => {
    this.props.navigation.navigate('StoreList', {serviceType: serviceType, filters: []});
  }

  goToLimitedSearch = () => {
    this.props.navigation.navigate('LimitedSearch');
  }

  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation}/>
        <ScrollView style = {styles.sectionsContainer}>
          <View style = {styles.sectionContainer}>
            <Text style={styles.title}> Servicios </Text>
            <View style={styles.categoriesContainer}>
              <TouchableOpacity style={styles.categoryPillExpress} onPress={() => this.goToLimitedSearch()}>
                 <Text style={styles.categoryText}>EXP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryPill} onPress={() => this.goToStoresView(1)}>
                 <Text style={styles.categoryText}>MyP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryPill} onPress={() => this.goToStoresView(2)} >
                  <Text style={styles.categoryText}>Ros</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryPill} onPress={() => this.goToStoresView(3)} >
                  <Text style={styles.categoryText}>Cue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryPill} onPress={() => this.goToStoresView(4)} >
                  <Text style={styles.categoryText}>SPA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryPill} onPress={() => this.goToStoresView(5)} >
                  <Text style={styles.categoryText}>Pel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryPill} onPress={() => this.goToStoresView(6)} >
                  <Text style={styles.categoryText}>Depi</Text>
              </TouchableOpacity>
            </View>
          </View>
          <DividerView />
          <View style = {styles.sectionContainer}>
            <Text style={styles.title}> Promociones </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <PromoView name='Promo 1' imageURL= {require('../assets/images/Promo.jpg')}/>
              <PromoView name='Promo 2' imageURL= {require('../assets/images/Promo.jpg')}/>
              <PromoView name='Promo 3' imageURL= {require('../assets/images/Promo.jpg')}/>
              <PromoView name='Promo 4' imageURL= {require('../assets/images/Promo.jpg')}/>
            </ScrollView>
          </View>
          <DividerView />
          <View style = {styles.sectionContainer}>
            <Text style={styles.title}> Favoritos </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <CenterView name='Centro 1' imageURL= {require('../assets/images/Store2.jpg')}/>
              <CenterView name='Centro 2' imageURL= {require('../assets/images/Store2.jpg')}/>
              <CenterView name='Centro 3' imageURL= {require('../assets/images/Store2.jpg')}/>
              <CenterView name='Centro 4' imageURL= {require('../assets/images/Store2.jpg')}/>
            </ScrollView>
          </View>
          <DividerView />
          <View style = {styles.sectionContainer}>
            <Text style={styles.title}> Centros nuevos </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <CenterView name='Centro 1' imageURL= {require('../assets/images/store.png')}/>
              <CenterView name='Centro 2' imageURL= {require('../assets/images/store.png')}/>
              <CenterView name='Centro 3' imageURL= {require('../assets/images/store.png')}/>
              <CenterView name='Centro 4' imageURL= {require('../assets/images/store.png')}/>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionsContainer: {
    flex: 1,
    marginTop: 80,
  },
  sectionContainer: {
    width: WIDTH,
    minHeight: HEIGHT/4,
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 10
  },
  categoriesContainer:{
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    padding: 5
  },
  categoryPill:{
    backgroundColor: 'rgba(91,195,191,0.4)',
    width: 60,
    height: 60,
    borderRadius:30,
    margin: 3,
    justifyContent: 'center'
  },
  categoryPillExpress:{
    backgroundColor: 'rgba(255,0,0,0.6)',
    width: 60,
    height: 60,
    borderRadius:30,
    margin: 3,
    justifyContent: 'center'
  },
  categoryText:{
    color: colors.WHITE,
    fontSize: 16,
    textAlign:'center',
    fontWeight: 'bold'
  }
});
