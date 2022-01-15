import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export const AccountProfile = (profile, ...props) => {
  var tmp = profile.profile;

  return(
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={tmp.Avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {tmp.FullName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {tmp.Email}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {tmp.DepartmentName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
  
};
