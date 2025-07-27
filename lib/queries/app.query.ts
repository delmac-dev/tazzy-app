
export const getAllSchedules = async () => {
  // all schedules this profile id created or is connected to in the 
  // templateRelations tables
}

export const muteSchedule = async () => {
  // mute all notifications from this schedule id
}

export const unmuteSchedule = async () => {
  // unmute muted schedule
}

export const removeSchedule = async () => {
  // get the schedule id and schedule type
  // if its a template remove user row in templatesRelations table
  // if its own schedule remove schedule with id schedule_id
}

export const getScheduleDetail = async () => {
  // used in the schedule edit form to prefill the edit form
}

export const getScheduleActivities = async () => {
  // get all the parent/default activies of this schedule id
}

export const getActivityChildren = async () => {
  // get the recurring instances/reschedules/extras activities connected to parent activity
}

export const createSchedule = async () => {

}

export const useTemplate = async () => {
  
}
