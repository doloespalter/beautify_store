export default {
  api: {
    baseUrl: 'https://afternoon-beyond-65086.herokuapp.com',
    // Login
    login: '/users/loginStoresApp',
    // MyAppointments
    appointments: '/api/stores/:storeId/appointments/toAttend/:date',
    confirmAppointments: '/api/stores/:storeId/appointments/toConfirm',
    confirmAppointment: '/api/stores/:storeId/appointments/confirm/:appointmentId',
    cancelAppointment: '/api/stores/:storeId/appointments/cancel/:appointmentId',
    notificationToken: '/api/users/notificationToken',
    //Chat
    getMessages: '/api/messages/:chatterId',
    messages: '/api/messages/'
  }
};
