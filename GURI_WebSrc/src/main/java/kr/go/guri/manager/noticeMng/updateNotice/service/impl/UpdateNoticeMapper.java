package kr.go.guri.manager.noticeMng.updateNotice.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
import kr.go.guri.cmm.vo.FileVO;
/**
 * 관리자 > 공지사항 수정 Mapper 클래스
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
 *  2021.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Repository("updateNoticeMapper")
public class UpdateNoticeMapper extends ComAbstractDAO {

	public int updateNotice(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return update("UpdateNoticeDAO.updateNotice", param);
	}

//	public int deleteFile(String filePk) {
//		// TODO Auto-generated method stub
//		return delete("UpdateNoticeDAO.deleteFile", filePk);
//	}
	public Map<String, Object> selectUpdateList(Map<String, Object> params) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return selectOne("UpdateNoticeDAO.selectUpdateList", params);
	}
	public Map<String, Object> selectFileInfo(String filePk) {
		// TODO Auto-generated method stub
		return selectOne("UpdateNoticeDAO.selectFileInfo", filePk);
	}

	public int deleteFile(Map<String, Object> param) {
		return delete("UpdateNoticeDAO.deleteFile", param);
	}

	public int updateFileUp(FileVO fileVO) {
		return insert("UpdateNoticeDAO.updateFileUp", fileVO);
	}

}
