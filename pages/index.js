import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList'
import styles from '../styles/Home.module.css'

function HomePage(props) {
    return (
      <Fragment>
          <Head>
              <title>React Meetups</title>
              <meta name='description' content='Browse a list of active React Meetups' />
          </Head>
          <MeetupList meetups={props.meetups} />
      </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//           meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://sergio0208rma7:JORQcDjikmFwesC9@cluster0.yovmepw.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage;