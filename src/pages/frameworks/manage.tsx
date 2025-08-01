import React, { useRef } from 'react';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PageLayout from '@/components/layout/PageLayout';
import { StepMasterCategoryHandle } from '@/interfaces/MasterCategoryInterface';
import type { StepCategoryHandle } from '@/interfaces/CategoryInterface';
import type { StepTermsHandle } from '@/interfaces/TermInterface';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useFrameworkFormStore } from '@/store/frameworkFormStore';
import Box from '@mui/material/Box';
import type { StepAssociationHandle } from '@/interfaces/AssociationInterface';
import StepperButton from '@/components/framework/StepperButton';
import { useStepManager } from '@/hooks/useStepManager';
import StepRenderer from '@/components/framework/StepRenderer';

// This component manages the taxonomy creation process through a series of steps.
// It allows users to select a channel, framework, master categories, categories, terms, and associations,
// guiding them through the taxonomy management workflow.
const steps = [
  { number: 1, title: 'Channel' },
  { number: 2, title: 'Framework' },
  { number: 3, title: 'Master Categories' },
  { number: 4, title: 'Categories' },
  { number: 5, title: 'Terms' },
  { number: 6, title: 'Associate and Publish' },
  { number: 7, title: 'View' },
];

// Controller for managing the taxonomy creation process.
// Now uses extracted hook and component for better maintainability.
const ManageTaxonomy: React.FC = () => {
  const { channel, framework } = useFrameworkFormStore();

  // Refs for step components
  const masterCategoryRef = useRef<StepMasterCategoryHandle>(null);
  const categoryRef = useRef<StepCategoryHandle>(null);
  const termsRef = useRef<StepTermsHandle>(null);
  const associationRef = useRef<StepAssociationHandle>(null);

  // All business logic extracted to custom hook
  const {
    isLoading,
    fetchError,
    showUnsavedDialog,
    step,
    handleNext,
    handleBack,
    handleDialogCancel,
    handleDialogNext,
  } = useStepManager({
    masterCategoryRef,
    categoryRef,
    termsRef,
    associationRef,
  });

  // Helper function to get dialog title based on step
  const getDialogTitle = (currentStep: number): string => {
    switch (currentStep) {
      case 3:
        return 'Unsaved Master Category';
      case 4:
        return 'Unsaved Category';
      case 5:
        return 'Unsaved Terms';
      case 6:
        return 'Unsaved Associations';
      default:
        return 'Unsaved Changes';
    }
  };

  // Helper function to get dialog content based on step
  const getDialogContent = (currentStep: number): string => {
    switch (currentStep) {
      case 3:
        return 'Are you sure you want to proceed to the next step without creating the new master category?';
      case 4:
        return 'Are you sure you want to proceed to the next step without creating the new category?';
      case 5:
        return 'Are you sure you want to proceed to the next step without creating the new terms?';
      case 6:
        return 'Are you sure you want to proceed to the next step without saving the new associations?';
      default:
        return 'Are you sure you want to proceed to the next step without saving your changes?';
    }
  };

  // Helper function to determine framework typography margin
  const getFrameworkMarginTop = (): number => {
    return channel?.code ? 0.5 : 0;
  };

  return (
    <PageLayout>
      <div
        style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 0' }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="text.primary"
            gutterBottom
          >
            Manage Taxonomy
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Follow the steps to manage the taxonomy for your framework.
          </Typography>

          <Stepper
            activeStep={step - 1}
            alternativeLabel
            sx={{ mb: 5, background: 'transparent' }}
          >
            {steps.map((stepObj) => (
              <Step key={stepObj.title}>
                <StepLabel>{stepObj.title}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {fetchError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {fetchError}
            </Alert>
          )}

          <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 4 }}>
            <CardHeader
              title={
                <Typography variant="h6" fontWeight={600}>
                  Step {step}: {steps[step - 1].title}
                </Typography>
              }
              action={
                <Box sx={{ minWidth: 180, textAlign: 'right' }}>
                  {channel?.code && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 400, display: 'block' }}
                    >
                      Channel: <b>{channel.code}</b>
                    </Typography>
                  )}
                  {framework?.code && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 400,
                        display: 'block',
                        mt: getFrameworkMarginTop(),
                      }}
                    >
                      Framework: <b>{framework.code}</b>
                    </Typography>
                  )}
                </Box>
              }
              sx={{
                bgcolor: '#f5f7fa',
                borderBottom: 1,
                borderColor: 'divider',
                py: 2,
                px: 3,
              }}
            />
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <StepRenderer
                step={step}
                framework={framework}
                masterCategoryRef={masterCategoryRef}
                categoryRef={categoryRef}
                termsRef={termsRef}
                associationRef={associationRef}
              />
            </CardContent>
            <CardActions
              sx={{
                justifyContent: 'space-between',
                borderTop: 1,
                borderColor: 'divider',
                p: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={step === 1 || isLoading}
                startIcon={<ArrowLeftIcon fontSize="small" />}
                sx={{ minWidth: 120, fontWeight: 600 }}
              >
                Back
              </Button>
              <StepperButton
                step={step}
                isLoading={isLoading}
                channel={channel}
                framework={framework}
                onNext={handleNext}
                stepsLength={steps.length}
              />
            </CardActions>
          </Card>
        </div>
      </div>
      <Dialog open={showUnsavedDialog} onClose={handleDialogCancel}>
        <DialogTitle>{getDialogTitle(step)}</DialogTitle>
        <DialogContent>
          <Typography>{getDialogContent(step)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogCancel}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogNext}
            color="primary"
            variant="contained"
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default ManageTaxonomy;
