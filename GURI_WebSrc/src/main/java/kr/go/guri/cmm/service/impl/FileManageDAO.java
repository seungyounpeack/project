package kr.go.guri.cmm.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.vo.FileVO;

/**
 * @Class Name : FileManageDAO.java
 * @Description : 파일정보 관리를 위한 데이터 처리 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 25.     이삼섭    최초생성
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 25.
 * @version
 * @see
 *
 */
@Repository("FileManageDAO")
public class FileManageDAO extends ComAbstractDAO {

	/**
	 * 여러 개의 파일에 대한 정보(속성 및 상세)를 등록한다.
	 *
	 * @param fileList
	 * @return
	 * @throws IOException, SQLException
	 */
	public String insertFileInfs(List<?> fileList) throws IOException, SQLException {
		FileVO vo = (FileVO) fileList.get(0);
		String atchFileId = vo.getAtchFileId();
		insert("FileManageDAO.insertFileInfo", vo);

		/*Iterator<?> iter = fileList.iterator();
		while (iter.hasNext()) {
			vo = (FileVO) iter.next();

			insert("FileManageDAO.insertFileInfo", vo);
		}
*/
		return atchFileId;
	}

	/**
	 * 하나의 파일에 대한 정보(속성 및 상세)를 등록한다.
	 *
	 * @param vo
	 * @throws IOException, SQLException
	 */
	public void insertFileInf(FileVO vo) throws IOException, SQLException {
		insert("FileManageDAO.insertFileInfo", vo);
	}

	/**
	 * 여러 개의 파일에 대한 정보(속성 및 상세)를 수정한다.
	 *
	 * @param fileList
	 * @throws IOException, SQLException
	 */
	public void updateFileInfs(List<?> fileList) throws IOException, SQLException {
		FileVO vo;
		Iterator<?> iter = fileList.iterator();
		while (iter.hasNext()) {
			vo = (FileVO) iter.next();
			insert("FileManageDAO.insertFileInfo", vo);
		}
	}

	/**
	 * 여러 개의 파일을 삭제한다.
	 *
	 * @param fileList
	 * @throws IOException, SQLException
	 */
	public void deleteFileInfs(List<?> fileList) throws IOException, SQLException {
		Iterator<?> iter = fileList.iterator();
		FileVO vo;
		while (iter.hasNext()) {
			vo = (FileVO) iter.next();

			delete("FileManageDAO.deleteFileDetail", vo);
		}
	}

	/**
	 * 하나의 파일을 삭제한다.
	 *
	 * @param fvo
	 * @throws IOException, SQLException
	 */
	public void deleteFileInf(FileVO fvo) throws IOException, SQLException {
		delete("FileManageDAO.deleteFileDetail", fvo);
	}

	/**
	 * 파일에 대한 목록을 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws IOException, SQLException
	 */
	@SuppressWarnings("unchecked")
	public List<FileVO> selectFileInfs(FileVO vo) throws IOException, SQLException {
		return (List<FileVO>) list("FileManageDAO.selectFileList", vo);
	}

	/**
	 * 파일 구분자에 대한 최대값을 구한다.
	 *
	 * @param fvo
	 * @return
	 * @throws IOException, SQLException
	 */
	public String getMaxFileSN(FileVO fvo) throws IOException, SQLException {
		return (String) selectOne("FileManageDAO.getMaxFileSN", fvo);
	}

	/**
	 * 파일에 대한 상세정보를 조회한다.
	 *
	 * @param fvo
	 * @return
	 * @throws IOException, SQLException
	 */
	public FileVO selectFileInf(FileVO fvo) throws IOException, SQLException {
		return (FileVO) selectOne("FileManageDAO.selectFileInf", fvo);
	}

	/**
	 * 전체 파일을 삭제한다.
	 *
	 * @param fvo
	 * @throws IOException, SQLException
	 */
	public void deleteAllFileInf(FileVO fvo) throws IOException, SQLException {
		update("FileManageDAO.deleteCOMTNFILE", fvo);
	}

	/**
	 * 파일명 검색에 대한 목록을 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws IOException, SQLException
	 */
	@SuppressWarnings("unchecked")
	public List<FileVO> selectFileListByFileNm(FileVO fvo) throws IOException, SQLException {
		return (List<FileVO>) list("FileManageDAO.selectFileListByFileNm", fvo);
	}

	/**
	 * 파일명 검색에 대한 목록 전체 건수를 조회한다.
	 *
	 * @param fvo
	 * @return
	 * @throws IOException, SQLException
	 */
	public int selectFileListCntByFileNm(FileVO fvo) throws IOException, SQLException {
		return (Integer) selectOne("FileManageDAO.selectFileListCntByFileNm", fvo);
	}

	/**
	 * 이미지 파일에 대한 목록을 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws IOException, SQLException
	 */
	@SuppressWarnings("unchecked")
	public List<FileVO> selectImageFileList(FileVO vo) throws IOException, SQLException {
		return (List<FileVO>) list("FileManageDAO.selectImageFileList", vo);
	}
}
