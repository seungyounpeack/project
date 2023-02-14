package kr.go.guri.manager.noticeMng.updateNotice.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import kr.go.guri.cmm.vo.FileVO;
/**
 * 관리자 > 공지사항 수정 Service 클래스
* @author 권기완
* @since 2022. 06. 25.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			수정자			수정내용
*  -------    		-------------   ----------------------
*  2022.06.25.   	권기완          최초 생성
*   
* </pre>
*/
public interface UpdateNoticeService {

	int updateNotice(Map<String, Object> param) throws SQLException , IOException;

	List<Map<String, Object>> selectUpdateList(Map<String, Object> params) throws SQLException , IOException;

	//int deleteFile(String filePk) throws SQLException , IOException;

	Map<String, Object> selectFileInfo(String filePk) throws SQLException , IOException;
	
	//파일삭제
	int deleteFile(Map<String, Object> param) throws SQLException, IOException;
	
	//파일추가
	int updateFileUp(FileVO fileVO) throws SQLException, IOException;

}
