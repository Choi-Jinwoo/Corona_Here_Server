import { Response } from 'express';

export default async (req, res: Response) => {
  const reqFiles = req.files;
  const files: string[] = [];

  reqFiles.forEach(reqFile => {
    files.push(reqFile.filename);
  });

  res.status(200).json({
    message: '파일 업로드 성공.',
    data: {
      files,
    },
  });
}