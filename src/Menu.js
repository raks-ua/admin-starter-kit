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
                    primaryText={translate('question_bank')}
                    rightIcon={<ArrowDropRight />}
                    menuItems={[
                        <MenuItemLink
                            primaryText={translate('professions.administration')} to="/chapters/list?professionId=12" onClick={onMenuTap}
                        />,
                        <MenuItemLink
                            primaryText={translate('professions.cabin_crew_member')} to="/chapters/list?professionId=2" onClick={onMenuTap}
                        />,
                        <MenuItemLink
                            primaryText={translate('professions.flight_crew_member')} to="/chapters/list?professionId=1" onClick={onMenuTap}
                        />,
                        <MenuItemLink
                            primaryText={translate('professions.maintenance_personal')} to="/chapters/list?professionId=14" onClick={onMenuTap}
                        />,
                        <MenuItemLink
                            primaryText={translate('professions.non_flying_personell')} to="/chapters/list?professionId=10" onClick={onMenuTap}
                        />,
                        <MenuItemLink
                            primaryText={translate('professions.occ')} to="/chapters/list?professionId=9" onClick={onMenuTap}
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

