import { AccountBusiness } from "src/modules/account/account-business.entity";
import { User } from "src/modules/user/user.entity";

export const messageFeedback = (user: User, message: string) => {
  return `Feedback\nID: ${user.id}\nИмя: ${user.first_name}\nНомер: ${user.phone}\nUsername: ${user.tg_username}\nMessage: ${message}`;
};

export const messageAccountFeedback = (account: AccountBusiness, message: string) => {
  return `Feedback\nID: ${account.id}\nИмя: ${account.name}\nНомер: ${account.phone}\nMessage: ${message}`;
};
