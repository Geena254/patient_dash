import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PatientData {
  name: string
  email: string
  phone: string
}

interface PatientState {
  patientData: PatientData | null
}

const initialState: PatientState = {
  patientData: null,
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientData: (state, action: PayloadAction<PatientData>) => {
      state.patientData = action.payload
    },
  },
})

export const { setPatientData } = patientSlice.actions
export default patientSlice.reducer