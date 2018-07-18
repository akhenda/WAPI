import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CacheableImage from 'react-native-cacheable-image';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import {
  View, Image, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import {
  Container, Content, Button, Text, Tab, Tabs, Icon,
} from 'native-base';

import { images } from 'src/theme';
import { getUserListings, getFavouriteListings } from 'src/state/actions/listings';
import LoadingIndicator from 'src/components/LoadingIndicator';
import styles from './styles/ProfileScreenStyles';


/* eslint-disable react/no-deprecated */
class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    // this.fetchUserListings();
  }

  componentWillReceiveProps() {
    // this.setState({ loading: false });
  }

  fetchUserListings = () => {
    const { token, user } = this.props;

    if (Object.keys(user).length > 0) {
      // this.setState({ loading: true });
      this.props.getUserListings(token, user.id);

      const ids = this.props.favourites.reduce((args, id) => `${args}include[]=${id}&`, '').slice(0, -1);
      this.props.getFavouriteListings(token, ids);
    }
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.listingItemContainer}
        onPress={() => Actions.listing({ id: item.id, onLeftButton: Actions.profile })}
      >
        <View style={styles.listingItemLoading}>
          <ActivityIndicator size="small" />
        </View>
        <CacheableImage
          resizeMode="cover"
          style={styles.listingItem}
          source={{ uri: item.featured_image_url[0] }}
        />
        <View style={styles.listingItemTextContainer}>
          <Text style={styles.listingItemText}>{item.title.rendered}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmpty(message) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );
  }

  render() {
    const { user } = this.props;
    if (this.state.loading) return <LoadingIndicator />;

    return (
      <GiftedForm
        formName='signupForm'
        clearOnClose={false}
        defaults={{
          /*
          username: 'Farid',
          'gender{M}': true,
          password: 'abcdefg',
          country: 'FR',
          birthday: new Date(((new Date()).getFullYear() - 18)+''),
          */
        }}
        validators={{
          fullName: {
            title: 'Full name',
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
              arguments: [3, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
            }, {
              validator: 'matches',
              arguments: /^[a-zA-Z0-9]*$/,
              message: '{TITLE} can contains only alphanumeric characters',
            }],
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [6, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
            }],
          },
          emailAddress: {
            title: 'Email address',
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
          gender: {
            title: 'Gender',
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
          birthday: {
            title: 'Birthday',
            validate: [{
              validator: 'isBefore',
              arguments: [moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
              message: 'You must be at least 18 years old',
            }, {
              validator: 'isAfter',
              arguments: [moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
              message: '{TITLE} is not valid',
            }],
          },
          country: {
            title: 'Country',
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
          name='fullName' // mandatory
          title='Full name'
          image={require('../images/icons/color/user.png')}
          placeholder='Marco Polo'
          clearButtonMode='while-editing'
        />

        <GiftedForm.TextInputWidget
          name='username'
          title='Username'
          image={require('../images/icons/color/contact_card.png')}
          placeholder='MarcoPolo'
          clearButtonMode='while-editing'
          onTextInputFocus={(currentText = '') => {
            if (!currentText) {
              const fullName = GiftedFormManager.getValue('signupForm', 'fullName');
              if (fullName) {
                return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
              }
            }
            return currentText;
          }}
        />

        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Password'
          placeholder='******'
          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require('../images/icons/color/lock.png')}
        />

        <GiftedForm.TextInputWidget
          name='emailAddress' // mandatory
          title='Email address'
          placeholder='example@nomads.ly'
          keyboardType='email-address'
          clearButtonMode='while-editing'
          image={require('../images/icons/color/email.png')}
        />

        <GiftedForm.SeparatorWidget />

        <GiftedForm.ModalWidget
          title='Gender'
          displayValue='gender'
          image={require('../images/icons/color/gender.png')}
        >
          <GiftedForm.SeparatorWidget />

          <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
            <GiftedForm.OptionWidget image={require('../images/icons/color/female.png')} title='Female' value='F'/>
            <GiftedForm.OptionWidget image={require('../images/icons/color/male.png')} title='Male' value='M'/>
          </GiftedForm.SelectWidget>
        </GiftedForm.ModalWidget>

        <GiftedForm.ModalWidget
          title='Birthday'
          displayValue='birthday'
          image={require('../images/icons/color/birthday.png')}
          scrollEnabled={false}
        >
          <GiftedForm.SeparatorWidget/>

          <GiftedForm.DatePickerIOSWidget
            name='birthday'
            mode='date'
            getDefaultDate={() => {
              return new Date(`${(new Date()).getFullYear() - 18}`);
            }}
          />
        </GiftedForm.ModalWidget>

        <GiftedForm.ModalWidget
          title='Country'
          displayValue='country'
          image={require('../images/icons/color/passport.png')}
          scrollEnabled={false}
        >
          <GiftedForm.SelectCountryWidget
            code='alpha2'
            name='country'
            title='Country'
            autoFocus={true}
          />
        </GiftedForm.ModalWidget>

        <GiftedForm.ModalWidget
          title='Biography'
          displayValue='bio'
          image={require('../images/icons/color/book.png')}
          scrollEnabled={true}
        >
          <GiftedForm.SeparatorWidget/>

          <GiftedForm.TextAreaWidget
            name='bio'
            autoFocus={true}
            placeholder='Something interesting about yourself'
          />
        </GiftedForm.ModalWidget>

        <GiftedForm.ErrorsWidget/>

        <GiftedForm.SubmitWidget
          title='Sign up'
          widgetStyles={{
            submitButton: {
              backgroundColor: 'green',
            },
          }}
          onSubmit={
            (isValid, values) => {
              if (isValid === true) {
                // prepare object
                // values.gender = values.gender[0];
                values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                /* Implement the request to your server using values variable
                ** then you can do:
                ** postSubmit();
                ** postSubmit(['An error occurred, please try again']);
                ** postSubmit(['Username already taken', 'Email already taken']);
                ** GiftedFormManager.reset('signupForm');
                */
              }
            }}
        />

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />
      </GiftedForm>
    );
  }
}

EditProfileScreen.propTypes = {
  user: PropTypes.object,
  places: PropTypes.array,
  token: PropTypes.string,
  favPlaces: PropTypes.array,
  favourites: PropTypes.array,
  getUserListings: PropTypes.func,
  getFavouriteListings: PropTypes.func,
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

export default connect(mapStateToProps, {
  getUserListings, getFavouriteListings,
})(EditProfileScreen);
