package kr.go.guri.solution.workDetail.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 관리자 > 공지 상세 Mapper 클래스
 * @author 백승연
 * @since 2022. 10. 26.
 * @version 0.1
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.10.26.   	백승연                       최초 생성
 *   
 * </pre>
 */
@Repository("workDetailMapper")
public class WorkDetailMapper extends ComAbstractDAO{

	public Map<String, Object> selectWorkList(Map<String, Object> params) throws SQLException, IOException{
		return selectOne("WorkDetailDAO.selectWorkList", params);
		
	}

	public int updateView(Map<String, Object> params) throws SQLException, IOException{
		return update("WorkDetailDAO.updateView", params);
	}

	public int updateCommend(Map<String, Object> params) throws SQLException, IOException{
		// TODO Auto-generated method stub
		return update("WorkDetailDAO.updateCommend", params);
	}

	public Map<String, Object> selectFileInfo(Map<String, Object> params) throws SQLException, IOException{
		// TODO Auto-generated method stub
		return selectOne("WorkDetailDAO.selectFileInfo", params);
	}

	public List<Map<String, Object>> selectReviewList(Map<String, Object> params) throws SQLException, IOException{
		// TODO Auto-generated method stub
		return selectList("WorkDetailDAO.selectReviewList", params);
	}

	public int workReviewInsert(Map<String, Object> params) throws SQLException, IOException{
		// TODO Auto-generated method stub
		return insert("WorkDetailDAO.workReviewInsert", params);
	}

	public int workReviewDelete(Map<String, Object> params) throws SQLException, IOException{
		// TODO Auto-generated method stub
		return update("WorkDetailDAO.workReviewDelete", params);
	}
	
}
