import { observable, action } from "mobx";
import React, { createContext } from "react";

import AddAlertIcon from '@mui/icons-material/AddAlert';
import MDSnackbar from "components_carrot/MDSnackbar";

class CommonClass {
  @observable appName = "Carrot-CXBD";
  @observable appLoaded = false;
  @observable noti = null;
  @observable copyNoti = null;

  @action setAppName(appName) {
    this.appName = appName;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

  /**
   * @param {*} message
   * 알람용 noti
   */
  @action setNoti(message) {
    if (message !== null) {
      this.noti = (
        <MDSnackbar
          place="tc"
          color="success"
          message={message}
          icon={AddAlertIcon}
          open
          closeNotification={() => this.setNoti(null)}
          close
        />
      );
    } else {
      this.noti = null;
    }
  }

  /**
   * 복사 완료 noti
   * @param {*} message
   */
  @action setCopyNoti(message) {
    this.copyNoti = (
      <MDSnackbar
        place="tc"
        color="warning"
        message={message}
        icon={AddAlertIcon}
        open
        closeNotification={() => this.setNoti(null)}
        close
      />
    );

    setTimeout(() => {
      this.copyNoti = null;
    }, 1500);
  }
}

const CommonStore = new CommonClass();
export default CommonStore;
