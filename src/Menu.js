import React from "react";
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'admin-on-rest';
import { translate } from "./i18nProvider";
import LocaleSwitcher from './LocaleSwitcher';
import MenuItem from "material-ui/MenuItem";

import ArrowDropRight from "material-ui/svg-icons/navigation-arrow-drop-right";

const Menu = ({ resources, onMenuTap, logout }) => (
    <div>
        <MenuItem
            primaryText={translate('testing')}
            rightIcon={<ArrowDropRight />}
            menuItems={
                <MenuItem
                    primaryText={translate('testing2')}
                    rightIcon={<ArrowDropRight />}
                    menuItems={[
                        <MenuItemLink
                            primaryText={translate('professions.test1')} to="/chapters/list?testId=1" onClick={onMenuTap}
                        />,
                        <MenuItemLink
                            primaryText={translate('professions.test2')} to="/chapters/list?testId=2" onClick={onMenuTap}
                        />,
                    ]}
                />
            }
        />
        <MenuItemLink
            primaryText={translate('resources.users.name')} to="/users" onClick={onMenuTap}
        />
            <LocaleSwitcher />
        {logout}
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});
export default connect(mapStateToProps)(Menu);

