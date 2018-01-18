import { StyleSheet, Platform } from 'react-native';

import { colors } from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.lightest,
  },
  content: {
    flex: 1,
    padding: 15,
    marginTop: 40,
  },
  formContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: colors.primary.text,
  },
  title: {
    padding: 8,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.primary.dark,
  },
  aboutYou: {
    marginVertical: 50,
  },
  selectInput: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.lightest,
  },
  label: {
    fontSize: 11,
    marginBottom: 6,
    color: colors.lightestText,
  },
  dateInputStyle: {
    width: '100%',
    height: 55,
  },
  dateInput: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.lightest,
  },
  dateTouchBody: {
    height: 50,
  },
  placeholderText: {
    color: 'black',
    textAlign: 'left',
    alignSelf: Platform.OS === 'ios' ? 'center' : 'flex-start',
    marginLeft: Platform.OS === 'ios' ? 0 : 10,
  },
  
  nextButton: {
    alignSelf: 'center',
    marginTop: 30,
  },
  
  interests: {
    marginTop: 50,
  },
  interestsInstructions: {
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
    color: colors.lightestText,
  },
  done: {
    flex: 1,
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneIcon: {
    fontSize: 100,
    marginBottom: 20,
    color: colors.secondary.light,
  },
  doneText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.secondary.text,
  },
  doneButton: {
    alignSelf: 'center',
  },
});

export const customStepperStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.secondary.main,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colors.secondary.main,
  stepStrokeUnFinishedColor: colors.separator,
  separatorFinishedColor: colors.secondary.main,
  separatorUnFinishedColor: colors.separator,
  stepIndicatorFinishedColor: colors.secondary.main,
  stepIndicatorUnFinishedColor: colors.primary.text,
  stepIndicatorCurrentColor: colors.primary.text,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.secondary.main,
  stepIndicatorLabelFinishedColor: colors.primary.text,
  stepIndicatorLabelUnFinishedColor: colors.separator,
  labelColor: colors.separator,
  labelSize: 13,
  currentStepLabelColor: colors.secondary.main,
};

export default styles;
