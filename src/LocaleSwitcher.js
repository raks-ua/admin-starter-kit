import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { changeLocale as changeLocaleAction, refreshView as refreshViewAction } from 'admin-on-rest';

const MyButton = styled(Button)({
    height: 48,
    padding: '0 15px',
});
class LocaleSwitcher extends Component {

    switchToRussian = () => {
        localStorage.setItem('lang', 'ru');
        this.props.changeLocale('ru');
        this.props.refreshView();
    };
    switchToUkrainian = () => {
        localStorage.setItem('lang', 'ua');
        this.props.changeLocale('ua');
        this.props.refreshView();
    };
    switchToEnglish = () => {
        localStorage.setItem('lang', 'en');
        this.props.changeLocale('en');
        this.props.refreshView();
    };

    render() {
        console.log('PROPS', this.props);
        return (
            <div>
                <MyButton>Language</MyButton>
                <div ></div>
                <Button onClick={this.switchToEnglish}>en</Button>
                <Button onClick={this.switchToRussian}>ru</Button>
                <Button onClick={this.switchToUkrainian}>ua</Button>
            </div>
        );
    }
}

export default connect(undefined, { changeLocale: changeLocaleAction, refreshView: refreshViewAction })(LocaleSwitcher);

