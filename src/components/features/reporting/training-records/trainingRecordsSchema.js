export const schema = [
  {
    column: '#',
    type: Number,
    value: (record) => record.row_num,
    width: 6
  },
  {
    column: 'First name',
    type: String,
    value: (record) => record.first_name,
    width: 20
  },
  {
    column: 'Last name',
    type: String,
    value: (record) => record.last_name,
    width: 20
  },
  {
    column: 'Birth date',
    type: Date,
    format: 'dd/mm/yyyy',
    value: (record) => new Date(record.birth_date),
    width: 10
  },
  {
    column: 'Company',
    type: String,
    value: (record) => record.company,
    width: 25
  },
  {
    column: 'Course',
    type: String,
    value: (record) => record.course,
    width: 20
  },
  {
    column: 'Start',
    type: Date,
    format: 'dd/mm/yyyy',
    value: (record) => new Date(record.start),
    width: 10
  },
  {
    column: 'End',
    type: Date,
    format: 'dd/mm/yyyy',
    value: (record) => new Date(record.end),
    width: 10
  },
  {
    column: 'Expiry',
    type: Date,
    format: 'dd/mm/yyyy',
    value: (record) => new Date(record.expiry),
    width: 10
  },
  {
    column: 'Expiration in Days',
    type: Number,
    value: (record) => record.days,
    width: 10
  },
  {
    column: 'Certificate',
    type: String,
    value: (record) => record.certificate,
    width: 20
  }
]
