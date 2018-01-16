import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, Text, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import StepIndicator from 'react-native-step-indicator';
import SelectInput from 'react-native-select-input-ios';

import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import styles, { customStepperStyles } from './styles/SurveyScreenStyles';


class SurveyScreen extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentPosition: 0,
      nationality: 'default',
      info: 'default',
      gender: 'default',
      date: '',
      interests: {
        activities: false,
        restaurants: false,
        medical: false,
        services: false,
        shopping: false,
        volunteer: false,
      },
    };
  }
  
  onInterestValueChange = (key, value) => {
    this.setState((prevState) => {
      return { interests: { ...prevState.interests, [key]: value } };
    });
  }
  
  onSubmitEditingValue = (key, value) => this.setState({ [key]: value });

  onPageChange = (position) => {
    const {
      currentPosition, nationality, info, gender, interests, date,
    } = this.state;
    const {
      activities, restaurants, medical, services, shopping, volunteer,
    } = interests;
    
    const isPageOneFilled = (
      nationality !== 'default' && info !== 'default' && gender !== 'default' && date
    );
    const isInterestSelected = (
      activities || restaurants || medical || services || shopping || volunteer
    );

    if (currentPosition === 0 && !isPageOneFilled) {
      this.renderAlert('Empty Fields', 'Please fill all fields on this section');
      return;
    }
    
    if (currentPosition === 1 && !isInterestSelected) {
      this.renderAlert('No interest selected', 'Please select at least one interest.');
      return;
    }
    
    this.setState({ currentPosition: position });
  };
  
  getNationalityOptions = () => {
    return [
      { value: 'default', label: 'I am a...' },
      { value: 'kenyan', label: 'Kenyan Citizen' },
      { value: 'expat', label: 'Expat' },
      { value: 'tourist', label: 'Tourist' },
      { value: 'on_business', label: 'On Business' },
      { value: 'other', label: 'Other' },
    ];
  };
  
  getInfoOptions = () => {
    return [
      { value: 'default', label: 'I work in...' },
      { value: 'student', label: 'Student' },
      { value: 'parent', label: 'Parent' },
      { value: 'concerned_citizen', label: 'Concerned Citizen' },
      { value: 'curious_bird', label: 'Curious Bird' },
      { value: 'other', label: 'Other' },
    ];
  };
  
  getGenderOptions = () => {
    return [
      { value: 'default', label: 'Gender' },
      { value: 'm', label: 'Male' },
      { value: 'f', label: 'Female' },
    ];
  };
  
  renderAlert(title, msg) {
    return (
      Alert.alert(
        title,
        msg,
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      )
    );
  }
  
  renderPicker(key, options) {
    return (
      <SelectInput
        options={options}
        buttonsTextSize={18}
        value={this.state[key]}
        style={styles.selectInput}
        buttonsBackgroundColor='#F8F9F9'
        onSubmitEditing={val => this.onSubmitEditingValue(key, val)}
      />
    );
  }
  
  renderCategory(icon, title, stateKey, color) {
    return (
      <ListItem icon>
        <Left>
          <Icon name={icon} style={{ color }}/>
        </Left>
        <Body>
          <Text>{title}</Text>
        </Body>
        <Right>
          <Switch
            value={this.state.interests[stateKey]}
            onValueChange={value => this.onInterestValueChange(stateKey, value)}
          />
        </Right>
      </ListItem>
    );
  }
  
  renderAboutYou() {
    return (
      <View style={styles.aboutYou}>
        {this.renderPicker('nationality', this.getNationalityOptions())}
        {this.renderPicker('info', this.getInfoOptions())}
        {this.renderPicker('gender', this.getGenderOptions())}
        <DatePicker
          date={this.state.date}
          mode="date"
          showIcon={false}
          placeholder="I was born..."
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: styles.dateInput,
            dateTouchBody: styles.dateTouchBody,
            placeholderText: styles.placeholderText,
          }}
          style={styles.dateInputStyle}
          onDateChange={(date) => { this.setState({ date }); } }
        />
      <Button success rounded style={styles.nextButton} onPress={() => this.onPageChange(1)}>
          <Text>Done, next step</Text>
        </Button>
      </View>
    );
  }
  
  renderYourInterests() {
    return (
      <View style={styles.interests}>
        <Text style={styles.interestsInstructions}>
          Choose the categories you are most interested in.
        </Text>
        <List>
          {this.renderCategory('walk', 'Activities', 'activities', 'orange')}
          {this.renderCategory('restaurant', 'Bars, Cafés & Restaurants', 'restaurants', 'darkblue')}
          {this.renderCategory('medkit', 'Medical', 'medical', 'green')}
          {this.renderCategory('pricetags', 'Services', 'services', 'darkslategrey')}
          {this.renderCategory('cart', 'Shopping', 'shopping', 'deepskyblue')}
          {this.renderCategory('hand', 'Volunteer/Donations', 'volunteer', 'fuchsia')}
          <Button success rounded style={styles.nextButton} onPress={() => this.onPageChange(2)}>
            <Text>Done, next step</Text>
          </Button>
        </List>
      </View>
    );
  }
  
  renderDone() {
    return (
      <View style={styles.done}>
        <Icon name="happy" style={styles.doneIcon} />
        <Text style={styles.doneText}>
          {'Thank you.\nEnjoy your experience.'}
        </Text>
        <Button success rounded style={styles.doneButton} onPress={Actions.drawer()}>
          <Text>Excellent, let&apos;s start</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { loading } = this.state;
    const labels = ['About You', 'Your Interests', 'Done'];

    if (loading) return <LoadingIndicator />;
  
    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          showLogo={false}
          showMenuButton={false}
          showExtraButton={false}
          headerTitle="Activities"
          extraButtonIcon="md-map"
        >
          <View style={[styles.content, { height: '100%' }]}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>TELL US MORE ABOUT YOU</Text>
              <StepIndicator
                stepCount={3}
                labels={labels}
                customStyles={customStepperStyles}
                currentPosition={this.state.currentPosition}
              />
              {this.state.currentPosition === 0
                ? this.renderAboutYou()
                : null}
              {this.state.currentPosition === 1
                ? this.renderYourInterests()
                : null}
              {this.state.currentPosition === 2
                ? this.renderDone()
                : null}
            </View>
          </View>
        </AnimatedContentWrapper>
      </Container>
    );
  }
}

SurveyScreen.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(SurveyScreen);