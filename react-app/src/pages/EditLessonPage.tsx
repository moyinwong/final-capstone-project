import { Container, Grid, InputLabel, MenuItem, Select, TextField, FormControl, makeStyles, Button, FormHelperText, CircularProgress } from '@material-ui/core'
import { push } from 'connected-react-router';
import React, { ChangeEvent, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './EditLessonPage.scss'

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time))

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: theme.spacing(1),
      minWidth: '50%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
const EditLessonPage = () => {
    const param: { lessonName: string} = useParams();
    const { lessonName } = param;
    const classes = useStyles();
    const dispatch = useDispatch();

    //related to input field
    const [lessonTitle, setLessonName] =  useState("");
    const [isTrial, setIsTrial] =  useState("");
    const [description, setDescription] =  useState("");
    const [videoURL, setVideoURL] =  useState("");

    //related to input validation
    const [isLessonNameValid, setIsLessonNameValid] = useState(false);
    const [isTrialEmpty, setIsTrialEmpty] = useState(false);
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
    const [isVideoURLEmpty, setVideoURLEmpty] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [completed, setCompleted] = useState(false)


    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const [files, setFiles] = useState<any[]>([]);

    let uploadFiles = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name}
        </li>
    ));

    const getLessonInfo = async () => {
        let queryRoute = "/lesson/info/";
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
        );
    
        const result = await res.json();
        const { lessonInfo } = result;
        if (!lessonInfo.is_trial) {
            setIsTrial('false');
        } else {
            setIsTrial('true');
        }
        setLessonName(lessonInfo.lesson_name);
        setDescription(lessonInfo.lesson_description);
        setVideoURL(lessonInfo.video_url)
    };

    const getFiles = async () => {
        let queryRoute: string = "/lesson/file/";
        const fetchRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${queryRoute}${lessonName}`
        );
    
        const result = await fetchRes.json();
        console.log(result.files)
        let retrievedFiles = result.files.map((file: any) => (
            <li key={file.file_name}>
                {file.file_name}
            </li>
        ))
        setFiles(retrievedFiles)
    };

    useEffect(() => {
        getLessonInfo();
        getFiles();
    }, [])

    //fill in lesson info into input field when useState occur
    useEffect(() => {
        let lessonTitleField = document.getElementById('lessonTitle') as HTMLInputElement
        if (lessonTitleField) {
            lessonTitleField.value = lessonTitle;
        }
        let isTrialField = document.getElementById('demo-simple-select') as HTMLInputElement
        if (isTrialField) {
            isTrialField.value = isTrial;
        }
        let descriptionField = document.getElementById('lessonDescription') as HTMLInputElement
        if (descriptionField) {
            descriptionField.value = description;
        }
        let videoURLField = document.getElementById('lessonVideoUrl') as HTMLInputElement
        if (videoURLField) {
            videoURLField.value = videoURL
        }
    }, [lessonTitle, isTrial, description, videoURL])

    //changeHandler for individual field
    let handleLessonNameChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setIsLessonNameValid(false);
        setLessonName(event.target.value);
    };

    let handleSelectChange = (
        event: any
    ) => {
        setIsTrialEmpty(false);
        setIsTrial(event.target.value);
    };

    let handleDescriptionChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setIsDescriptionEmpty(false);
        setDescription(event.target.value);
    };

    let handleVideoURLChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setVideoURLEmpty(false);
        setVideoURL(event.target.value);
    };

    let handleSubmit = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (lessonTitle.length < 4) {
            setIsLessonNameValid(true);
            return;
        } else if (isTrial === '') {
            setIsTrialEmpty(true);
            return;
        } else if (description.length < 10) {
            setIsDescriptionEmpty(true);
            return;
        } else if (!videoURL.match(/https/)) {
            setVideoURLEmpty(true);
            return;
        } else {
            let formData = new FormData();
            formData.append('lessonName', lessonTitle);
            formData.append('lessonIsTrial', isTrial);
            formData.append('lessonDescription', description);
            formData.append('lessonVideoUrl', videoURL);

            if (acceptedFiles.length) {
                for (let file of acceptedFiles) {
                    formData.append('files', file);
                }
            }

            const queryRoute = '/lesson/edit'
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${queryRoute}/${lessonName}`, {
                method: 'PUT',
                body: formData
            })
            const result = await res.json();
            console.log(result);
            await sleep(1000);
            setCompleted(true);
            await sleep(1000);
            dispatch(push('/instructor'))
        }   
    }

    

    return (
        <div>
            <Container id="edit-lesson-container" component="main" maxWidth="md">
                <Button href="/instructor" variant="contained" color="secondary" size="large">Exit</Button>
                <form id="edit-lesson-form"  noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {lessonTitle.length ?
                                <TextField
                                    defaultValue={lessonTitle}
                                    error={isLessonNameValid}
                                    helperText={isLessonNameValid ? "不如寫多啲" : ""}
                                    name="lessonTitle"
                                    required
                                    fullWidth
                                    id="lessonTitle"
                                    autoFocus
                                    label="課堂名稱"
                                    onChange={handleLessonNameChange}
                                /> : ''
                            }
                            {!lessonTitle.length &&
                                <TextField
                                    error={isLessonNameValid}
                                    helperText={isLessonNameValid ? "不如寫多啲" : ""}
                                    name="lessonTitle"
                                    required
                                    fullWidth
                                    id="lessonTitle"
                                    autoFocus
                                    label="課堂名稱"
                                    onChange={handleLessonNameChange}
                                />
                            }
                        </Grid>

                        <Grid item xs={12}>
                            {isTrial &&
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">允許試堂</InputLabel>
                                        <Select
                                            fullWidth 
                                            error={isTrialEmpty}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={isTrial}
                                            onChange={handleSelectChange}
                                        >
                                            <MenuItem value={`true`}>是</MenuItem>
                                            <MenuItem value={`false`}>否</MenuItem>
                                        </Select>
                                        <FormHelperText>{isTrialEmpty ? "請選擇" : ""}</FormHelperText>
                                </FormControl>
                            }
                        </Grid>

                        <Grid item xs={12}>
                            {description &&
                                <TextField
                                    defaultValue={description}
                                    error={isDescriptionEmpty}
                                    helperText={isDescriptionEmpty ? "不如寫多啲" : ""}
                                    name="lessonDescription"
                                    required
                                    fullWidth
                                    id="lessonDescription"
                                    autoFocus
                                    label="課堂內容"
                                    onChange={handleDescriptionChange}
                                />
                            }
                            {!description &&
                                <TextField
                                    error={isDescriptionEmpty}
                                    helperText={isDescriptionEmpty ? "不如寫多啲" : ""}
                                    name="lessonDescription"
                                    required
                                    fullWidth
                                    id="lessonDescription"
                                    autoFocus
                                    label="課堂內容"
                                    onChange={handleDescriptionChange}
                                />
                            }
                        </Grid>

                        <Grid item xs={12}>
                            {videoURL &&
                                <TextField
                                    defaultValue={videoURL}
                                    error={isVideoURLEmpty}
                                    helperText={isVideoURLEmpty ? "請提供完整網址" : ""}
                                    name="lessonVideoUrl"
                                    required
                                    fullWidth
                                    id="lessonVideoUrl"
                                    autoFocus
                                    label="課堂影片"
                                    onChange={handleVideoURLChange}
                                />
                            }
                            {!videoURL &&
                                <TextField
                                    error={isVideoURLEmpty}
                                    helperText={isVideoURLEmpty ? "請提供完整網址" : ""}
                                    name="lessonVideoUrl"
                                    required
                                    fullWidth
                                    id="lessonVideoUrl"
                                    autoFocus
                                    label="課堂影片"
                                    onChange={handleVideoURLChange}
                                />
                            }
                        </Grid>

                        <Grid item xs={12}>
                            <section className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <span>拖曳或選擇檔案上傳，如需上傳多個檔案，請一次選擇多個檔案</span>
                                </div>
                                <aside>
                                    <h4 style={{marginTop: '30px'}}>原有教材</h4>
                                    <ul style={{marginTop: '30px'}}>{files}</ul>
                                    <h4 style={{marginTop: '30px'}}>更新教材</h4>
                                    <ul style={{marginTop: '30px'}}>{uploadFiles}</ul>
                                </aside>
                            </section>
                        </Grid>

                    </Grid>
                    
                    {!completed &&
                        <Button
                            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                            id={isSubmitting ? 'submitting-button' : "submit-button"}
                            type="submit" 
                            variant="contained" 
                            onClick={handleSubmit}
                            disabled={isSubmitting ? true : false}
                        >
                            {isSubmitting ? '提交中' : '提交'}
                        </Button>
                    }
                    {completed && <div>成功建立課堂<i className="fas fa-check-circle"></i></div>}

                </form>
            </Container>
        </div>
    )
}

export default EditLessonPage
