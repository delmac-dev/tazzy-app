import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import * as profileAPI from "@/lib/queries/profile.query";

export const profiles = createQueryKeys("profiles", {
    all: null,
    details: {
      queryKey: null,
      queryFn: () => profileAPI.getProfileDetails()
    }
});

export const notifications = createQueryKeys("notifications", {
  all: null,
  unread: ["unread"],
  read: ["read"]
})

export const schedules = createQueryKeys("schedules", {

});

export const activities = createQueryKeys("activities", {

});

export const queries = mergeQueryKeys(profiles, notifications, schedules, activities);