import { defineStore } from 'pinia'

export const useClassStore = defineStore('classStore', {
  state: () => ({
    examInfo: {
      examName: '',
      examTYpe: '',
      startDate: '',
      endDate: '',
      examYear: '',
      term: '',
      notes: ''
    },
    classes: [],
  }),
  actions: {
    addClass(cls) {
      const exists = this.classes.find((c) => c.class_name === cls.class_name)
      if (!exists) this.classes.push(cls)
    },

    removeClassByName(className) {
      this.classes = this.classes.filter((c) => c.class_name !== className)
    },

    addSubjectToClass(className, subject) {
      const targetClass = this.classes.find((c) => c.name === className)
      if (targetClass) {
        const exists = targetClass.subjects.find(
          (s) => s.subjectDetails.subject_name === subject.subjectDetails.subject_name
        )
        if (!exists) targetClass.subjects.push(subject)
      }
    },

    removeSubjectFromClass(className, index) {
      const targetClass = this.classes.find((c) => c.name === className)
      if (targetClass) {
        targetClass.subjects.splice(index, 1)
      }
    },

    addStreamToClass(className, stream) {
      const targetClass = this.classes.find((c) => c.name === className)
      if (targetClass) {
        const exists = targetClass.streams.find(
          (s) => s.streamDetails.stream_name === stream.stream_name
        )
        if (!exists) targetClass.streams.push(stream)
      }
    },

    removeStreamFromClass(className, index) {
      const targetClass = this.classes.find((c) => c.name === className)
      if (targetClass) {
        targetClass.streams.splice(index, 1)
      }
    },

    updateSubjectField(className, subjectIndex, key, value) {
      const targetClass = this.classes.find((c) => c.name === className)
      if (targetClass && targetClass.subjects[subjectIndex]) {
        targetClass.subjects[subjectIndex][key] = value
      }
    },
  },
})
