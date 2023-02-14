package kr.go.guri.cmm.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import kr.go.guri.cmm.vo.FileVO;

/**
 * @Class Name : ComFileMngService.java
 * @Description : 파일정보의 관리를 위한 서비스 인터페이스
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
public interface ComFileMngService {

    /**
     * 파일에 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws IOException, SQLException
     */
    public List<FileVO> selectFileInfs(FileVO fvo) throws IOException, SQLException;

    /**
     * 하나의 파일에 대한 정보(속성 및 상세)를 등록한다.
     *
     * @param fvo
     * @throws IOException, SQLException
     */
    public String insertFileInf(FileVO fvo) throws IOException, SQLException;

    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 등록한다.
     *
     * @param fvoList
     * @throws IOException, SQLException
     */
    public String insertFileInfs(List<?> fvoList) throws IOException, SQLException;

    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 수정한다.
     *
     * @param fvoList
     * @throws IOException, SQLException
     */
    public void updateFileInfs(List<?> fvoList) throws IOException, SQLException;

    /**
     * 여러 개의 파일을 삭제한다.
     *
     * @param fvoList
     * @throws IOException, SQLException
     */
    public void deleteFileInfs(List<?> fvoList) throws IOException, SQLException;

    /**
     * 하나의 파일을 삭제한다.
     *
     * @param fvo
     * @throws IOException, SQLException
     */
    public void deleteFileInf(FileVO fvo) throws IOException, SQLException;

    /**
     * 파일에 대한 상세정보를 조회한다.
     *
     * @param fvo
     * @return
     * @throws IOException, SQLException
     */
    public FileVO selectFileInf(FileVO fvo) throws IOException, SQLException;

    /**
     * 파일 구분자에 대한 최대값을 구한다.
     *
     * @param fvo
     * @return
     * @throws IOException, SQLException
     */
    public String getMaxFileSN(FileVO fvo) throws IOException, SQLException;

    /**
     * 전체 파일을 삭제한다.
     *
     * @param fvo
     * @throws IOException, SQLException
     */
    public void deleteAllFileInf(FileVO fvo) throws IOException, SQLException;

    /**
     * 파일명 검색에 대한 목록을 조회한다.
     *
     * @param fvo
     * @return
     * @throws IOException, SQLException
     */
    public Map<String, Object> selectFileListByFileNm(FileVO fvo) throws IOException, SQLException;

    /**
     * 이미지 파일에 대한 목록을 조회한다.
     *
     * @param vo
     * @return
     * @throws IOException, SQLException
     */
    public List<FileVO> selectImageFileList(FileVO vo) throws IOException, SQLException;
}
