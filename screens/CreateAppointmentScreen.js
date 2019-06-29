import * as React from "react";
import { Image, StyleSheet, View, Text, Picker,TouchableOpacity} from "react-native";
import CalendarStrip from 'react-native-calendar-strip';
import MenuButton from '../components/MenuButton';
import Button from '../components/Button';
import TimingList from '../components/AvailableTimingsList';
import PickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { fetchServiceDetails } from '../actions/ServiceActions';
import {Alert} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { fetchAvailableTimings, createAppointment } from '../actions/AppointmentActions';
import LoadingIndicator from '../components/LoadingIndicator';
import moment from "moment";


const data = [
  {value: 0, label:"Sin Preferencia", key: 0}
]

class CreateAppointmentScreen extends React.Component{

    state = {
      employeeId: 0,
      storeId: 0,
      servideId: 0,
      selectedDate: '',
      selectedTime: ''
    }

    componentDidMount(){
      this.updateData();
    }

    updateData(){
      const storeId  = this.props.navigation.state.params.storeId;
      const serviceId  = this.props.navigation.state.params.serviceId;

      //TODO: Change date to today
      //TODO: FIX Comp did mount

      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var today = year + "/" + month + "/" + date;
      let filters = [{ key: "date", value: today},{ key: "serviceId", value: serviceId}];

      this.setState({
        storeId: storeId,
        serviceId: serviceId,
        selectedDate: today
      });

      this.props.fetchServiceDetails(storeId, serviceId);
      this.props.fetchAvailableTimings(storeId, filters);
    }

    onTimeSelect = (value) => {
      this.setState({
        selectedTime: value,
      });
    }

    handleEmployeeChange = (value) => {
      //TODO: FIJARSE XQ SE LLAMA TRES VECES
      const { storeId } = this.state;

      this.setState({
        employeeId: value,
      });

      let filters = this.getFilters();
      this.props.fetchAvailableTimings(storeId, filters);
    }

    onDateSelected = (value) => {
      const { storeId } = this.state;
      var formattedDate = value.format("YYYY/MM/DD");

      this.setState({
        selectedDate: formattedDate
      });

      const filters = this.getFilters();
      this.props.fetchAvailableTimings(storeId, filters);
    }

    getFilters = () => {
      const { employeeId, selectedDate, serviceId } = this.state;

      let filters = [{ key: "date", value: selectedDate},{ key: "serviceId", value: serviceId}];
      if(employeeId != 0){
          filters.push({key: "employeeId", value: employeeId});
      }
      return filters;
    }

    onCreateAppointmentClick = () => {
      const { createAppointment, loggedIn, token } = this.props;
      const { employeeId, selectedDate, serviceId, selectedTime, storeId } = this.state;


      if(!loggedIn){
        Alert.alert("Necesitas iniciar sesion");
      }
      else if(selectedTime === ''){
          Alert.alert("Debe seleccionar hora");
      }
      else {
        const duration = this.props.service.duration;

        const start =  selectedDate + " " + selectedTime;
        var m = moment(start, "YYYY/MM/DD HH:mm");
        const timeStart = m.format("YYYY/MM/DD HH:mm");
        const timeEnd = m.add(duration, 'minutes').format("YYYY/MM/DD HH:mm");

        let data = {
          serviceId: serviceId,
          timeStart: timeStart,
          timeEnd: timeEnd
        }

        if (employeeId !== 0){
          data.employeeId = employeeId;
        }

       createAppointment(storeId, data, token).then((response) => {
          Alert.alert(response);
       })


      }

    }


    render() {
      const { service, loading, employees, timingsLoading, timings, creatingAppointment } = this.props;
      return (

        <View style={styles.container}>
        {
          (loading || creatingAppointment) && (<LoadingIndicator style={{marginTop:10}}/>)
        }
        {
          !loading && !creatingAppointment &&  (
            <View>
                <NavigationEvents onDidFocus={() => this.updateData()} />
                <MenuButton navigation={this.props.navigation}/>
                <View style={styles.mainView}>
                  <CalendarStrip
                  style={{height:100, paddingTop: 20}}
                  calendarAnimation={{type: 'sequence', duration: 30}}
                  daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, backgroundHighlightColor: 'red'}}
                  onDateSelected={(date) => this.onDateSelected(date)}
                  />
                  <TimingList
                    timings={timings}
                    selectedTime={this.state.selectedTime}
                    loading={timingsLoading}
                    onClick={this.onTimeSelect}
                  />
                </View>
                <View style={styles.employeeView}>
                  <Text style={styles.labelText}> Seleccionar empleado: </Text>

                  <PickerSelect
                    placeholder=""
                    items={employees}
                    onValueChange={value =>
                      this.handleEmployeeChange(value)
                    }
                    value={this.state.employeeId}
                    style={pickerSelectStyles }
                    itemKey={(value, index) => index}
                    useNativeAndroidPickerStyle={false}
                  />

                </View>
                <Button
                  title="Reservar"
                  onClick={this.onCreateAppointmentClick}
                />
              </View>

          )
        }
        </View>

      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainView: {
    marginTop: 70,
  },
  employeeView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  labelText:{
    fontSize: 14,
    marginBottom: 10,
  }
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }
});


const mapStateToProps = state => ({
    service: state.service.service,
    employees: state.service.employees,
    loading: state.service.loading,
    creatingAppointment: state.appointment.creatingAppointment,
    timingsLoading: state.appointment.loading,
    timings: state.appointment.timings,
    token: state.auth.token,
    loggedIn: state.auth.loggedIn
});


const mapDispatchToProps = dispatch => ({
    fetchServiceDetails: (idStore, idService) => dispatch(fetchServiceDetails(idStore, idService)),
    fetchAvailableTimings: (idStore, filters) => dispatch(fetchAvailableTimings(idStore, filters)),
    createAppointment:(idStore, body, token) => dispatch(createAppointment(idStore, body, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAppointmentScreen);
