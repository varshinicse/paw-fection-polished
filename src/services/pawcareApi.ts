import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Pet {
  id: string;
  ownerId?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weightKg: number;
  foodHabits?: string;
  medicalHistory?: string[];
  avatarAsset?: string;
  createdAt?: Date;
}

export interface Reminder {
  id: string;
  petId: string;
  type: string;
  title: string;
  notes: string;
  scheduledTime: Date;
  repeat: string;
  isCompleted: boolean;
  notificationEnabled?: boolean;
  notificationId?: number;
}

export interface HealthRecord {
  id: string;
  petId: string;
  title: string;
  type: string;
  notes?: string;
  date: string;
  vet?: string;
}

export interface Post {
  id: string;
  authorName: string;
  city?: string;
  timeAgo?: string;
  content: string;
  likes: number;
  commentsCount: number;
  isVet?: boolean;
}

// ================= PETS API =================
export function subscribePets(callback: (pets: Pet[]) => void): Unsubscribe {
  const q = collection(db, "pets");
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        callback([]);
        return;
      }
      const pets: Pet[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          ownerId: d.ownerId || "default_user",
          name: d.name || "Bruno",
          species: d.species || "dog",
          breed: d.breed || "Golden Retriever",
          age: Number(d.age) || 2.5,
          weightKg: Number(d.weightKg) || 28.5,
          foodHabits: d.foodHabits || "",
          medicalHistory: Array.isArray(d.medicalHistory) ? d.medicalHistory : [],
          avatarAsset: d.avatarAsset || "dog_hero",
        };
      });
      callback(pets);
    },
    (err) => {
      console.warn("Firestore pets listener error:", err);
      callback([]);
    }
  );
}

export async function addPet(pet: Omit<Pet, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "pets"), {
    ...pet,
    ownerId: pet.ownerId || "default_user",
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

// ================= REMINDERS API =================
export function subscribeReminders(
  petId: string | null,
  callback: (reminders: Reminder[]) => void
): Unsubscribe {
  const coll = collection(db, "reminders");
  const q = petId ? query(coll, where("petId", "==", petId)) : coll;

  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        callback([]);
        return;
      }
      const list: Reminder[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        let scheduled: Date = new Date();
        if (d.scheduledTime instanceof Timestamp) {
          scheduled = d.scheduledTime.toDate();
        } else if (typeof d.scheduledTime === "string") {
          scheduled = new Date(d.scheduledTime);
        }
        return {
          id: docSnap.id,
          petId: d.petId || "pet_bruno_1",
          type: d.type || "Meal",
          title: d.title || "Care Task",
          notes: d.notes || d.description || "",
          scheduledTime: scheduled,
          repeat: d.repeat || "daily",
          isCompleted: Boolean(d.isCompleted),
          notificationEnabled: d.notificationEnabled !== false,
          notificationId: d.notificationId,
        };
      });
      callback(list);
    },
    (err) => {
      console.warn("Firestore reminders listener error:", err);
      callback([]);
    }
  );
}

export async function createReminder(reminder: {
  petId: string;
  title: string;
  notes?: string;
  type: string;
  scheduledTime: Date;
  repeat?: string;
}): Promise<string> {
  const docRef = await addDoc(collection(db, "reminders"), {
    petId: reminder.petId,
    title: reminder.title,
    notes: reminder.notes || "",
    type: reminder.type,
    scheduledTime: Timestamp.fromDate(reminder.scheduledTime),
    repeat: reminder.repeat || "daily",
    isCompleted: false,
    notificationEnabled: true,
    notificationId: Math.floor(Math.random() * 90000) + 10000,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function toggleReminderComplete(
  reminderId: string,
  newCompletedStatus: boolean,
  reminderData?: { petId: string; title: string; type: string; petName?: string }
): Promise<void> {
  const ref = doc(db, "reminders", reminderId);
  await updateDoc(ref, {
    isCompleted: newCompletedStatus,
    completedAt: newCompletedStatus ? Timestamp.now() : null,
    updatedAt: Timestamp.now(),
  });

  // Automatically record completion to care_history (matching Flutter CareHistoryProvider)
  if (newCompletedStatus && reminderData) {
    try {
      await addDoc(collection(db, "care_history"), {
        reminderId,
        petId: reminderData.petId,
        activityType: reminderData.type,
        title: reminderData.title,
        description: `Completed scheduled ${reminderData.type} via web companion.`,
        completedAt: Timestamp.now(),
        createdAt: Timestamp.now(),
      });
    } catch (e) {
      console.warn("Could not log care history:", e);
    }
  }
}

export async function deleteReminder(reminderId: string): Promise<void> {
  await deleteDoc(doc(db, "reminders", reminderId));
}

// ================= HEALTH RECORDS API =================
export function subscribeHealthRecords(
  petId: string,
  callback: (records: HealthRecord[]) => void
): Unsubscribe {
  const q = query(collection(db, "health_records"), where("petId", "==", petId));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        callback([]);
        return;
      }
      const list: HealthRecord[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          petId: data.petId,
          title: data.title || "Check-up",
          type: data.recordType || data.type || "Prescription",
          date: data.date ? new Date(data.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Recent",
          vet: data.vetName || data.vet || "Apollo Pet Clinic",
          notes: data.notes || "",
        };
      });
      callback(list);
    },
    (err) => {
      console.warn("Firestore health records error:", err);
      callback([]);
    }
  );
}

// ================= SOCIAL POSTS API =================
export function subscribePosts(callback: (posts: Post[]) => void): Unsubscribe {
  const coll = collection(db, "posts");
  return onSnapshot(
    coll,
    (snapshot) => {
      if (snapshot.empty) {
        callback([]);
        return;
      }
      const posts: Post[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          authorName: d.authorName || "Varshini",
          city: d.city || "Bangalore",
          timeAgo: d.timeAgo || "Recently",
          content: d.content || "",
          likes: Number(d.likes) || 0,
          commentsCount: Number(d.commentsCount || (d.comments ? d.comments.length : 0)),
          isVet: Boolean(d.isVet),
        };
      });
      callback(posts);
    },
    (err) => {
      console.warn("Firestore posts listener error:", err);
      callback([]);
    }
  );
}

export async function likePost(postId: string, newLikesCount: number): Promise<void> {
  const ref = doc(db, "posts", postId);
  await updateDoc(ref, { likes: newLikesCount });
}
