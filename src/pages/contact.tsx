import styles from '@/styles/Contact.module.css'
import { Button, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import Header from './Components/Header/Header'
import Navigation from './Components/Navigation/Navigation'

const inter = Inter({ subsets: ['latin'] })
const contact = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Paper sx={{ padding: '2rem' }} elevation={0}>
          <Grid container direction="column" spacing={2}>
            <Grid item md={12}>
              <Navigation active='contact' />
            </Grid>
            <Grid item md={12}>
              <Typography variant="h4" className={inter.className} sx={{ textAlign: "center" }}>
                Get in touch!
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Grid container direction='column' alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant='h6'>Contact Form</Typography>
                </Grid>
                <Grid item>
                  <form>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item md={6} xs={12}>
                            <Grid container direction="column" spacing={2}>
                              <Grid item>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='name'>Your Name</InputLabel>
                                  <OutlinedInput id='name' name='name' label="Your Name" />
                                </FormControl>
                              </Grid>
                              <Grid item>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='email'>Email</InputLabel>
                                  <OutlinedInput id='email' name='email' label="Email" />
                                </FormControl>
                              </Grid>
                              <Grid item>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='phone'>Phone</InputLabel>
                                  <OutlinedInput id='phone' name='phone' label="Phone" />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <FormControl fullWidth>
                              <InputLabel htmlFor='message'>Message</InputLabel>
                              <OutlinedInput id='message' name='message' label="Message" multiline rows={7} />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Button variant='contained' size='large' type="submit" fullWidth>Send</Button>
                      </Grid>
                    </Grid>

                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  )
}

export default contact