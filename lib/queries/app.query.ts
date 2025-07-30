import { supabase } from "../supabase"
import { IScheduleForm } from "../types"

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

export const getScheduleDetail = async ({id}:{id: string}) => {
  if (!id) return null;

  const { data, error } = await supabase
    .from('schedules')
    .select('accessibility, emoji, color, name, status')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};

export const updateSchedule = async ({id, data}:{id:string, data:IScheduleForm}) => {
  const { data: updatedRow, error } = await supabase
    .from('schedules')
    .update(data)
    .eq('id', id)
    .select('id, accessibility, emoji, color, name, status')
    .single();

  if (error) throw error;

  return updatedRow;
};

export const createSchedule = async ({data}:{data:IScheduleForm}) => {
  const { data: { session } , error: sessionError } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.user) throw new Error("No user session found");

  const ownerID = session?.user?.id;

  const { data: schedule, error: scheduleError } = await supabase
    .from('schedules')
    .insert({ ...data, owner_id: ownerID })
    .select('id, accessibility, emoji, color, name, status')
    .single();

  if (scheduleError) throw scheduleError;

  const { error: linkError } = await supabase
    .from('account_schedule')
    .insert({
      account_id: ownerID,
      schedule_id: schedule.id,
      access_level: 'owner',
    });
  
  if (linkError) {
    await supabase.from('schedules').delete().eq('id', schedule.id);
    console.error('Error linking user to schedule, schedule rolled back.');
    throw linkError;
  }

  return schedule;
}

export const getScheduleActivities = async () => {
  // get all the parent/default activies of this schedule id
}

export const getActivityChildren = async () => {
  // get the recurring instances/reschedules/extras activities connected to parent activity
}


export const useTemplate = async () => {
  
}
