import { SendFeedback } from "features/app/send-feedback/send-feedback";

import { HeaderPage } from "shared/ui";

export const FeedbackPage = () => {
  return (
    <div className="flex flex-col grow px-4 pt-2">
      <HeaderPage title="Обратная связь" withBack />
      <SendFeedback />
    </div>
  );
};
