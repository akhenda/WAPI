import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

import { updateUserInfo } from 'src/state/actions/auth';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { getOccupationOptions } from 'src/utils/occupationOptions';
import { getNationalityOptions } from 'src/utils/nationalityOptions';

import { images, colors } from 'src/theme';
import styles from './styles/ProfileScreenStyles';

// eslint-disable react/no-deprecated
/* eslint-disable camelcase */
class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { user } = this.props;
    if (this.state.loading) return <LoadingIndicator />;

    const {
      meta,
      username,
      description: bio,
      last_name: lastName,
      email: emailAddress,
      first_name: firstName,
    } = user;
    const {
      occupation,
      nationality,
      interested_in_medical: medical,
      interested_in_services: services,
      interested_in_shopping: shopping,
      interested_in_activities: activities,
      interested_in_volunteering: volunteering,
      interested_in_restaurants: restaurants,
    } = meta;

    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor={colors.primary.dark} />
        <GiftedForm
          formName='profileForm'
          clearOnClose={false}
          defaults={{
            firstName,
            lastName,
            username,
            bio,
            emailAddress,
            [`occupation{${occupation}}`]: true,
            [`nationality{${nationality}}`]: true,
            services: services === '1',
            medical: medical === '1',
            shopping: shopping === '1',
            activities: activities === '1',
            volunteering: volunteering === '1',
            restaurants: restaurants === '1',
          }}
          openModal={(route) => {
            Actions.formModal({
              title: route.getTitle(),
              renderScene: route.renderScene,

              /*
                Option 1: If you like the buttons react-native-gifted-form
                gives you, then use this step:
              */
              // renderRightButton: route.renderRightButton.bind(route, Actions),

              /*
                Option 2: If you prefer your own right button (or text), then
                use this step:
              */
              onRight: route.onClose.bind(null, null, Actions),
            });
          }}
          validators={{
            firstName: {
              title: 'First Name',
              validate: [{
                validator: 'isLength',
                arguments: [1, 23],
                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
              }],
            },
            lastName: {
              title: 'Last Name',
              validate: [{
                validator: 'isLength',
                arguments: [1, 23],
                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
              }],
            },
            username: {
              title: 'Username',
              validate: [{
                validator: 'isLength',
                arguments: [3, 24],
                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
              }, {
                validator: 'matches',
                arguments: /^[a-zA-Z0-9]*$/,
                message: '{TITLE} can contains only alphanumeric characters',
              }],
            },
            emailAddress: {
              title: 'Email Address',
              validate: [{
                validator: 'isLength',
                arguments: [6, 255],
              }, {
                validator: 'isEmail',
              }],
            },
            bio: {
              title: 'Biography',
              validate: [{
                validator: 'isLength',
                arguments: [0, 512],
                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
              }],
            },
            occupation: {
              title: 'Occupation',
              validate: [{
                validator: (...args) => {
                  if (args[0] === undefined) {
                    return false;
                  }
                  return true;
                },
                message: '{TITLE} is required',
              }],
            },
            nationality: {
              title: 'Nationality',
              validate: [{
                validator: 'isLength',
                arguments: [2],
                message: '{TITLE} is required',
              }],
            },
          }}
        >
          <GiftedForm.SeparatorWidget />

          <GiftedForm.TextInputWidget
            name='firstName'
            title='First Name'
            image={images.icons.user}
            placeholder='Jane'
            clearButtonMode='while-editing'
          />

          <GiftedForm.TextInputWidget
            name='lastName'
            title='Last Name'
            image={images.icons.user}
            placeholder='Doe'
            clearButtonMode='while-editing'
          />

          <GiftedForm.TextInputWidget
            name='username'
            title='Username'
            editable={false}
            placeholder='JaneDoe'
            clearButtonMode='while-editing'
            image={images.icons.contact_card}
            onTextInputFocus={(currentText = '') => {
              if (!currentText) {
                const fullName = GiftedFormManager.getValue('profileForm', 'fullName');
                if (fullName) {
                  return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
                }
              }
              return currentText;
            }}
          />

          <GiftedForm.TextInputWidget
            name='emailAddress'
            title='Email'
            placeholder='example@website.com'
            keyboardType='email-address'
            clearButtonMode='while-editing'
            image={images.icons.email}
          />

          <GiftedForm.ModalWidget
            title='Biography'
            displayValue='bio'
            image={images.icons.book}
            scrollEnabled={true}
          >
            <GiftedForm.SeparatorWidget/>

            <GiftedForm.TextAreaWidget
              name='bio'
              autoFocus={true}
              placeholder='Something interesting about yourself'
            />
          </GiftedForm.ModalWidget>

          <GiftedForm.SeparatorWidget />

          <GiftedForm.ModalWidget
            title='Occupation'
            displayValue='occupation'
            image={images.icons.occupation}
          >
            <GiftedForm.SeparatorWidget />

            <GiftedForm.SelectWidget name='occupation' title='Occupation' multiple={false}>
              {getOccupationOptions().slice(1).map((job) => {
                return (
                  <GiftedForm.OptionWidget
                    key={job.value}
                    title={job.label}
                    value={job.value}
                    image={images.icons[job.icon]}
                  />
                );
              })}
            </GiftedForm.SelectWidget>
          </GiftedForm.ModalWidget>

          <GiftedForm.ModalWidget
            title='Nationality'
            displayValue='nationality'
            image={images.icons.passport}
            scrollEnabled={false}
          >
            <GiftedForm.SelectWidget name='nationality' title='Nationality' multiple={false}>
              {getNationalityOptions().slice(1).map((val) => {
                return (
                  <GiftedForm.OptionWidget
                    key={val.value}
                    title={val.label}
                    value={val.value}
                    image={images.icons[val.icon]}
                  />
                );
              })}
            </GiftedForm.SelectWidget>
          </GiftedForm.ModalWidget>

          <GiftedForm.SeparatorWidget />
          <GiftedForm.NoticeWidget title='Your Interests' />

          <GiftedForm.SwitchWidget
            name="activities"
            title="Activities"
            image={images.icons.activities}
          />
          <GiftedForm.SwitchWidget
            name="medical"
            title="Medical"
            image={images.icons.medical}
          />
          <GiftedForm.SwitchWidget
            name="restaurants"
            title="Restaurants"
            image={images.icons.restaurants}
          />
          <GiftedForm.SwitchWidget
            name="services"
            title="Services"
            image={images.icons.services}
          />
          <GiftedForm.SwitchWidget
            name="shopping"
            title="Shopping"
            image={images.icons.shopping}
          />
          <GiftedForm.SwitchWidget
            name="volunteering"
            title="Volunteering"
            image={images.icons.volunteering}
          />


          <GiftedForm.ErrorsWidget/>

          <GiftedForm.SubmitWidget
            title='Save Profile'
            widgetStyles={{
              submitButton: {
                backgroundColor: colors.primary.main,
              },
            }}
            onSubmit={
              (isValid, values) => {
                if (isValid === true) {
                  this.props.updateUserInfo(this.props.token, values);
                  // prepare object
                  // values.gender = values.gender[0];
                  // values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                  /* Implement the request to your server using values variable
                  ** then you can do:
                  ** postSubmit();
                  ** postSubmit(['An error occurred, please try again']);
                  ** postSubmit(['Username already taken', 'Email already taken']);
                  ** GiftedFormManager.reset('profileForm');
                  */
                }
              }}
          />
        </GiftedForm>
      </View>
    );
  }
}

EditProfileScreen.propTypes = {
  user: PropTypes.object,
  places: PropTypes.array,
  token: PropTypes.string,
  favPlaces: PropTypes.array,
  favourites: PropTypes.array,
  updateUserInfo: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    places: state.listings.places,
    favourites: state.app.favourites,
    favPlaces: state.listings.favourites,
  };
};

export default connect(mapStateToProps, { updateUserInfo })(EditProfileScreen);
