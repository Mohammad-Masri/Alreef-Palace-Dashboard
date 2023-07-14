/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import { Button, Card, CardContent, CardHeader, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/Iconify';
import RowGrid from 'src/components/RowGrid';
import { STATIC_DATA } from 'src/server/static-data';
import { Link as RouterLink } from 'react-router-dom';
import { convertDateToFormatDate } from 'src/helper/moment';

const EmployeeCardDetails = ({ employee }) => {
  return (
    <Card style={{ padding: 20 }}>
      <CardHeader
        avatar={
          <Chip
            label={employee?.in_working ? 'يعمل' : 'متوقف عن العمل'}
            color={employee?.in_working ? 'success' : 'warning'}
          />
        }
        title={employee?.name}
        action={
          <Button
            variant="text"
            component={RouterLink}
            to={`/dashboard/employee/${employee?.id}/financial-report`}
            startIcon={<Iconify icon="tabler:report-money" />}
          >
            عرض السجل المالي
          </Button>
        }
        style={{ color: '#2065D1' }}
      />
      <CardContent>
        <Grid container direction="row-reverse" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Grid item xs={12} sm={6}>
            <RowGrid
              children={
                <>
                  <Grid item>{employee?.phone_number}</Grid>

                  <Grid item>
                    <Typography variant="subtitle2">رقم الهاتف </Typography>
                  </Grid>
                  <Grid item>
                    <Iconify icon="carbon:phone-filled" style={{ fontSize: '36px' }} />
                  </Grid>
                </>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RowGrid
              children={
                <>
                  <Grid item>{employee?.position}</Grid>

                  <Grid item>
                    <Typography variant="subtitle2">الوظيفة</Typography>
                  </Grid>
                  <Grid item>
                    <Iconify icon="ic:baseline-work" style={{ fontSize: '36px' }} />
                  </Grid>
                </>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RowGrid
              children={
                <>
                  <Grid item>{STATIC_DATA.DEFAULT_CURRENCY_NAME}</Grid>
                  <Grid item>{employee?.salary}</Grid>

                  <Grid item>
                    <Typography variant="subtitle2">الراتب</Typography>
                  </Grid>
                  <Grid item>
                    <Iconify icon="flat-color-icons:money-transfer" style={{ fontSize: '36px' }} />
                  </Grid>
                </>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RowGrid
              children={
                <>
                  <Grid item>{STATIC_DATA.DEFAULT_CURRENCY_NAME}</Grid>
                  <Grid item>{employee?.one_day_vacation_discount}</Grid>

                  <Grid item>
                    <Typography variant="subtitle2">قيمة الخصم ليوم واحد</Typography>
                  </Grid>
                  <Grid item>
                    <Iconify icon="noto:money-with-wings" style={{ fontSize: '36px' }} />
                  </Grid>
                </>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <RowGrid
              children={
                <>
                  <Grid item>
                    {convertDateToFormatDate(employee?.birthday) ? (
                      convertDateToFormatDate(employee?.birthday)
                    ) : (
                      <>غير محدد</>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">تاريح الميلاد</Typography>
                  </Grid>{' '}
                  <Grid item>
                    <Iconify icon="noto-v1:birthday-cake" style={{ fontSize: '36px' }} />
                  </Grid>
                </>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RowGrid
              children={
                <>
                  <Grid item>
                    {convertDateToFormatDate(employee?.joining_date) ? (
                      convertDateToFormatDate(employee?.joining_date)
                    ) : (
                      <>غير محدد</>
                    )}
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle2">تاريخ الانضمام</Typography>
                  </Grid>
                  <Grid item>
                    <Iconify icon="gis:flag-start-b" style={{ fontSize: '36px' }} />
                  </Grid>
                </>
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeeCardDetails;
