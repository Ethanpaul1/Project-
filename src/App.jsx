import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';

const initialValues = {
  fullName: '',
  email: '',
  course: '',
  year: '',
};

const courses = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Data Science',
];

function validateStudent(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Enter at least 3 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.course) {
    errors.course = 'Choose a course';
  }

  if (!values.year) {
    errors.year = 'Choose a year of study';
  }

  return errors;
}

function titleForActivity(activity, count, latestStudentName) {
  if (activity === 'submitting') {
    return 'Registering Student...';
  }

  if (activity === 'submitted' && latestStudentName) {
    return `${latestStudentName} Registered Successfully`;
  }

  if (activity === 'editing') {
    return 'Completing Registration Form';
  }

  if (count === 0) {
    return 'Student Registration Tracker';
  }

  return `${count} ${count === 1 ? 'Student' : 'Students'} Registered`;
}

function FormActivityWatcher({ onEditing }) {
  const { dirty } = useFormikContext();

  useEffect(() => {
    if (dirty) {
      onEditing();
    }
  }, [dirty, onEditing]);

  return null;
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [formActivity, setFormActivity] = useState('idle');
  const [latestStudentName, setLatestStudentName] = useState('');
  const originalTitle = useRef(document.title);

  const registeredCount = students.length;
  const markFormEditing = useCallback(() => {
    setFormActivity('editing');
  }, []);
  const currentTitle = useMemo(
    () => titleForActivity(formActivity, registeredCount, latestStudentName),
    [formActivity, latestStudentName, registeredCount],
  );

  useEffect(() => {
    document.title = currentTitle;

    // Cleanup restores the previous page title when this component unmounts.
    return () => {
      document.title = originalTitle.current;
    };
  }, [currentTitle]);

  function handleSubmit(values, { resetForm, setSubmitting }) {
    setFormActivity('submitting');

    const newStudent = {
      id: crypto.randomUUID(),
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      registeredAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTimeout(() => {
      setStudents((currentStudents) => [newStudent, ...currentStudents]);
      setLatestStudentName(newStudent.fullName);
      setFormActivity('submitted');
      setSubmitting(false);
      resetForm();
    }, 500);
  }

  return (
    <main className="app-shell">
      <section className="intro-panel" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">React useEffect Demo</p>
          <h1 id="page-title">Student Registration Tracker</h1>
          <p className="intro-copy">
            A Formik-powered registration flow where the browser tab title reacts
            to form activity and the number of submitted students.
          </p>
        </div>

        <div className="title-preview" aria-live="polite">
          <span>Current tab title</span>
          <strong>{currentTitle}</strong>
        </div>
      </section>

      <section className="content-grid">
        <div className="form-panel">
          <div className="section-heading">
            <p className="eyebrow">Registration Form</p>
            <h2>Add a student</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validate={validateStudent}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
                <Form className="student-form" noValidate>
                  <FormActivityWatcher
                    onEditing={markFormEditing}
                  />
                  <label>
                    <span>Full name</span>
                    <Field
                      name="fullName"
                      placeholder="e.g. Amina Mwangi"
                      onFocus={() => setFormActivity('editing')}
                    />
                    <ErrorMessage component="small" name="fullName" />
                  </label>

                  <label>
                    <span>Email address</span>
                    <Field
                      name="email"
                      placeholder="student@example.com"
                      type="email"
                      onFocus={() => setFormActivity('editing')}
                    />
                    <ErrorMessage component="small" name="email" />
                  </label>

                  <label>
                    <span>Course</span>
                    <Field
                      as="select"
                      name="course"
                      onFocus={() => setFormActivity('editing')}
                    >
                      <option value="">Select course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage component="small" name="course" />
                  </label>

                  <label>
                    <span>Year of study</span>
                    <Field
                      as="select"
                      name="year"
                      onFocus={() => setFormActivity('editing')}
                    >
                      <option value="">Select year</option>
                      <option value="Year 1">Year 1</option>
                      <option value="Year 2">Year 2</option>
                      <option value="Year 3">Year 3</option>
                      <option value="Year 4">Year 4</option>
                    </Field>
                    <ErrorMessage component="small" name="year" />
                  </label>

                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register student'}
                  </button>
                </Form>
              )}
          </Formik>
        </div>

        <aside className="tracker-panel" aria-labelledby="tracker-title">
          <div className="count-card">
            <span>Submitted students</span>
            <strong>{registeredCount}</strong>
          </div>

          <div className="section-heading compact">
            <p className="eyebrow">Live Results</p>
            <h2 id="tracker-title">Recent registrations</h2>
          </div>

          {students.length === 0 ? (
            <p className="empty-state">
              No students submitted yet. Complete the form to update this list
              and the browser tab title.
            </p>
          ) : (
            <ul className="student-list">
              {students.map((student) => (
                <li key={student.id}>
                  <div>
                    <strong>{student.fullName}</strong>
                    <span>{student.email}</span>
                  </div>
                  <p>
                    {student.course} - {student.year}
                  </p>
                  <time>{student.registeredAt}</time>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>

      <section className="explanation-band">
        <article>
          <h2>Why useEffect is needed</h2>
          <p>
            Changing the browser tab title is a side effect because it updates
            the document outside React&apos;s rendered UI. The effect listens to
            the computed title, so React updates the tab only when form activity
            or the submitted count changes.
          </p>
        </article>
        <article>
          <h2>Dependencies used</h2>
          <p>
            The title is derived from <code>formActivity</code>,{' '}
            <code>latestStudentName</code>, and <code>students.length</code>.
            Those values demonstrate dependency-based effects in a practical way.
          </p>
        </article>
      </section>
    </main>
  );
}
