import { addFlashcard } from "@/store/slices/FlashcardSlice";
import { useDispatch } from "react-redux";
import uuid from "uuid/v4";
import firebase from "firebase/app";

export const useCopyCard = (user, card, selectedItems) => {
  const dispatch = useDispatch();
  const timestamp = firebase.firestore.Timestamp.now();

  const handleCopyCard = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const resAll = await Promise.all([
          selectedItems.map(async (item) => {
            let newCard = {
              ...card,
              id: uuid(),
              cateId: item.key,
              createdAt: JSON.stringify(timestamp),
            };

            await dispatch(addFlashcard({ userId: user.uid, card: newCard }));
          }),
        ]);

        resolve(resAll);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  return {
    handleCopyCard,
  };
};
