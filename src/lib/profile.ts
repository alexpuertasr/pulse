interface ProfileFields {
  dateOfBirth?: Date | null;
  gender?: string | null;
  height?: number | null;
}

export function isProfileComplete(user: ProfileFields) {
  return user.dateOfBirth != null && user.gender != null && user.height != null;
}
